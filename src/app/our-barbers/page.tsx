import { db } from "prisma/client";
import React, { Suspense } from "react";
import { OurBarbersSection } from "../_components/home/our-barbers-section";
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
          <div className="mt-12">
            <OurBarbersSection experts={experts} signedOut={<></>} />
          </div>
        </Suspense>
      </main>
    </React.Fragment>
  );
}
