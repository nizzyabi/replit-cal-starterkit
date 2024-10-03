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
