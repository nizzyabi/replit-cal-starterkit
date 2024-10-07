"use client";

import ConnectCalendarStep from "./connect-calendar-step";
import UserFilters from "./user-filters-step";
import UserDetailsStep from "./user-details-step";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { type FilterOption } from "@prisma/client";

const steps = [
  { id: "connect-calendar", label: "Step 1" },
  { id: "avatar-and-bio", label: "Step 2" },
] satisfies StepItem[];

const GettingStarted = ({
  userId,
  filterOptions,
}: {
  userId: string;
  filterOptions: Array<FilterOption>;
}) => {
  return (
    <main className="flex-1 bg-muted/40">
      <div className="flex items-center justify-center p-10">
        <div className="w-1/2">
          <Stepper initialStep={0} steps={steps}>
            {steps.map(({ id, label }, index) => {
              return (
                <Step key={id} label={label}>
                  {index === 0 && (
                    <div className="flex h-full min-h-96 flex-col items-center justify-between">
                      <ConnectCalendarStep />
                    </div>
                  )}
                  {index === 1 && <UserDetailsStep userId={userId} />}
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
    </main>
  );
};

export default GettingStarted;
