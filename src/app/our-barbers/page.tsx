import Link from "next/link";
import { db } from "prisma/client";
import React, { Suspense } from "react";
import { Logo } from "../_components/universal/logo";
import { Results } from "../_components/home/results";

export default async function OurBarbers() {
  const experts = await db.user.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" }, // Add this line to sort by creation date
  });

  return (
    <React.Fragment>
      <div className="flex w-full items-center justify-between p-2 py-2">
        <Logo />
        <div className="flex gap-4">
          <Link href="#barbers">Location</Link>
          <Link href="#barbers">Our Barbers</Link>
        </div>
      </div>

      <main className="flex-1">
        <Suspense>
          <div>
            <Results experts={experts} signedOut={<></>} />
          </div>
        </Suspense>
      </main>
    </React.Fragment>
  );
}
