"use client";

import ConnectCalendarStep from "./connect-calendar-step";
import UserDetailsStep from "./user-details-step";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";

const steps = [
  { id: "connect-calendar", label: "Step 1" },
  { id: "avatar-and-bio", label: "Step 2" },
] satisfies StepItem[];

const GettingStarted = ({
  userId,
}: {
  userId: string; 
}) => {
  return (
    <main className="flex-1 bg-muted/40">
      <div className="flex items-center justify-center p-10">
        <div className="w-1/2">
          <UserDetailsStep userId={userId} />
        </div>
      </div>
    </main>
  );
};

export default GettingStarted;
