"use client";

import UserDetailsStep from "./user-details-step";

const GettingStarted = ({
  userId,
}: {
  userId: string; 
}) => {
  return (
    <main className="flex-1">
      <div className="flex items-center justify-center p-10">
        <div className="w-1/2">
          <UserDetailsStep userId={userId} />
        </div>
      </div>
    </main>
  );
};

export default GettingStarted;
