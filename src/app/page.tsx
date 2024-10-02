import { Results } from "./_components/home/results";
import SignupCard from "./_components/home/signup-card";
import { ButtonSubmit } from "./_components/submit-button";
import { Logo } from "./_components/universal/logo";
import { SignedIn, SignedOut, signOut } from "@/auth";
import AnimatedMain from "@/components/animated-main";
import AnimatedNavbarHeader from "@/components/animated-navbar";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { db } from "prisma/client";
import React, { Suspense } from "react";

export default async function Home() {
  const experts = await db.user.findMany({
    where: { status: "PENDING" },
    include: { selectedFilterOptions: { include: { filterOption: true } } },
  });

  return (
    <React.Fragment>
      <AnimatedNavbarHeader>
        <div className="flex w-full items-center justify-between">
          <Logo />
          <div>
            <SignedIn>
              {(_user) => (
                <div className="flex gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}>
                    <ButtonSubmit className="w-full" variant="outline">
                      Logout
                    </ButtonSubmit>
                  </form>
                  <Link href="/dashboard">
                    <Button className="w-full">
                      Dashboard
                      <LogIn className="ml-1 size-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </AnimatedNavbarHeader>
      <main className="flex-1">
        <Suspense>
          <AnimatedMain>
            <Results
              experts={experts}
              signedOut={
                <></>
              }
            />
          </AnimatedMain>
        </Suspense>
      </main>
    </React.Fragment>
  );
}
