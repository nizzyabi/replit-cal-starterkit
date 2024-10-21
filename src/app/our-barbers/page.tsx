import { db } from "prisma/client";
import React, { Suspense } from "react";
import { Results } from "../_components/home/results";
import { Navbar } from "@/components/navbar";

export default async function OurBarbers() {
  const experts = await db.user.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" }, 
  });

  return (
    <React.Fragment>
      <Navbar />
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
