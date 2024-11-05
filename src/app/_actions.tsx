"use server";

import { type LoginFormState } from "./login/_components/login";
import { LoginSchema, SignupSchema, auth, signIn, unstable_update } from "@/auth";
import { type User } from "@prisma/client";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { db } from "prisma/client";
import { z } from "zod";

export async function signInWithCredentials(_prevState: LoginFormState, formData: FormData) {
  try {
    const credentials = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!credentials.success) {
      return {
        inputErrors: credentials.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", formData);
    return { error: null };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          console.error("Uncaught error signing in (AuthError): ", error);
          return { error: "Something went wrong." };
      }
    }
    console.error("Uncaught error signing in", error);
    throw error;
  }
}

export async function signUpWithCredentials(_prevState: { error?: string | null }, formData: FormData) {
  try {
    const credentials = SignupSchema.safeParse({
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!credentials.success) {
      return {
        inputErrors: credentials.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", formData);
    return { error: null };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          console.error("Uncaught error signing in (AuthError): ", error);
          return { error: "Something went wrong." };
      }
    }
    console.error("Uncaught error signing in", error);
    throw error;
  }
}

export async function barberEdit(
  _prevState: { error: null | string } | { success: null | string },
  formData: FormData
) {
  console.log("[_actions] Updating barber with form data: ", formData);
  const sesh = await auth();
  if (!sesh?.user.id) {
    console.log("[_actions] Unauthorized user edit", formData);
    return { error: "Unauthorized" };
  }

  const formDataWithoutActionFields = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => !key.toLowerCase().startsWith("$action"))
  );

  // Updated schema to handle all possible form fields
  const userEdit = z
    .object({
      name: z.string().min(1).max(255),
    })
    .or(z.object({ bio: z.string().min(1).max(255) }))
    .or(z.object({ 
      costPerHairCut: z.string()
        .transform((val) => {
          const parsed = parseInt(val, 10);
          if (isNaN(parsed)) throw new Error("Invalid number");
          return parsed;
        })
        .refine((val) => val > 0 && val <= 500, {
          message: "Cost must be between 1 and 500"
        })
    }))
    .safeParse(formDataWithoutActionFields);

  if (!userEdit.success) {
    console.log("[_actions] Invalid form data", userEdit.error);
    return { error: "Invalid form data" };
  }

  const key = Object.keys(userEdit.data)[0] as keyof typeof userEdit.data;
  if (!key) {
    console.error("[_actions] Invalid form data", formData);
    return { error: "Invalid form data" };
  }

  let user: User | null;
  try {
    user = await db.user.update({
      where: { id: sesh.user.id },
      data: {
        [key]: userEdit.data[key],
      },
    });

    revalidatePath("/dashboard/settings/profile");
    await unstable_update({ user: { name: user.name } });

    // Customize success message based on the field being updated
    const successMessage = key === 'costPerHairCut'
      ? `Successfully updated your cost per haircut to: $${userEdit.data[key]}`
      : `Successfully updated your ${key} to: '${userEdit.data[key]}'`;

    return { success: successMessage };
  } catch (error) {
    console.error("Uncaught error updating barber", error);
    return { error: "Internal Server Error" };
  }
}
