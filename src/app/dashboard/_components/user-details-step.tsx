import SupabaseReactDropzone from "../settings/_components/supabase-react-dropzone";
import { barberEdit } from "@/app/_actions";
import { ButtonSubmit } from "@/app/_components/submit-button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SupabaseHaircutDropzone from "../settings/_components/supabase-haircut-dropzone";
import { Input } from "@/components/ui/input";


type UserDetailsFormState = { error: null | string } | { success: null | string };

const UserDetailsStep = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [userDetailsFormState, dispatch] = useFormState<UserDetailsFormState, FormData>(barberEdit, {
    error: null,
  });
  const [uploadedHaircutImages, setUploadedHaircutImages] = useState<File[]>([]);
  const [costError, setCostError] = useState<string | null>(null);

  const handleHaircutImagesUploaded = (files: File[]) => {
    setUploadedHaircutImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear error when input is empty
    if (!value) {
      setCostError(null);
      return;
    }

    // Only allow positive numbers
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      setCostError("Please enter a valid number");
      return;
    }

    if (numValue <= 0) {
      setCostError("Cost must be greater than 0");
      return;
    }

    if (numValue > 500) {
      setCostError("Cost cannot exceed 1000");
      return;
    }

    setCostError(null);
  };

  useEffect(() => {
    if ("success" in userDetailsFormState && userDetailsFormState?.success) {
      router.push("/dashboard");
    }
  }, [userDetailsFormState]);

  return (
    <form className="mt-10" action={dispatch}>
      <h1 className="text-5xl font-display font-bold text-center mb-3">Your Profile</h1>

      <div>
        <Label htmlFor="haircutImages">Profile Picture</Label>
        <SupabaseReactDropzone userId={userId ?? "clxj4quka0000gebuthdxi1cp"} />
      </div>

      <div className="mt-2">
        <Label htmlFor="haircutImages">Your Haircuts</Label>
        <SupabaseHaircutDropzone 
          userId={userId ?? "clxj4quka0000gebuthdxi1cp"} 
        />
        {uploadedHaircutImages.length > 0 && (
          <div className="mt-1">
            <p>Uploaded haircut images:</p>
            <ul className="list-disc pl-5">
              {uploadedHaircutImages.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none mt-1"
          id="bio"
          name="bio"
          maxLength={500}
        />
      </div>

      <div className="mt-2">
        <Label htmlFor="costPerHairCut">Cost per haircut ($)</Label>
        <Input
          type="number"
          placeholder="Enter cost per haircut"
          className="resize-none mt-1"
          id="costPerHairCut"
          name="costPerHairCut"
          min="1"
          max="1000"
          step="1"
          onChange={handleCostChange}
          required
        />
        {costError && (
          <p className="mt-2 text-red">
            {costError}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center w-full gap-2">
        <ButtonSubmit variant="default" size="sm" disabled={!!costError}>
          Finish Profile
        </ButtonSubmit>
      </div>
    </form>
  );
};

export default UserDetailsStep;
