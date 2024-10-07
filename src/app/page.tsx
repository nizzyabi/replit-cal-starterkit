import { Results } from "./_components/home/results";
import { Logo } from "./_components/universal/logo";
import { db } from "prisma/client";
import React, { Suspense } from "react";

export default async function Home() {
  const experts = await db.user.findMany({
    where: { status: "PENDING" },
    include: { selectedFilterOptions: { include: { filterOption: true } } },
    orderBy: { createdAt: 'desc' }, // Add this line to sort by creation date
  });

  return (
    <React.Fragment>
      <div className="flex w-full items-center justify-between py-2 pl-2">
        <Logo />
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
