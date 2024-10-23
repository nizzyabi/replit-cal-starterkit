"use client";

import { AvailabilitySettings } from "@calcom/atoms";

/**
 * [@calcom] Make sure to wrap your app with our `CalProvider` to enable the use of our hooks.
 * @link https://cal.com/docs/platform/quick-start#5.3-setup-root-of-your-app
 */
export const SettingsContent = () => {
  return (
    <div>
    <h1 className="text-3xl font-bold">Availability Settings</h1>
    <div className="grid gap-6 [&>div]:rounded-lg [&>div]:border [&>div]:border-slate-100/10 [&>div]:bg-card [&>div]:text-white [&>div]:shadow-sm mt-4">

      <AvailabilitySettings

        customClassNames={{
          // this is to avoid layout shift when toggling days
          ctaClassName: "!text-black",
          scheduleClassNames: {
            scheduleDay: "min-w-[480px] !text-black",
          },
          containerClassName: "!font-sans !bg-white !text-black !border !rounded-lg !border-black !p-6",
          formClassName: '',
          editableHeadingClassName:
            "!text-2xl !font-semibold !leading-none !tracking-tight !pr-4 min-w-[20rem]",
          subtitlesClassName: "!text-sm  !leading-relaxed !max-w-lg",
        }}
        onUpdateSuccess={() => {
          console.log("[@calcom/atoms]: Updated successfully");
        }}
        onUpdateError={() => {
          console.log("[@calcom/atoms]: Update error");
        }}
        onDeleteError={() => {
          console.log("[@calcom/atoms]: Deletion error");
        }}
        onDeleteSuccess={() => {
          console.log("[@calcom/atoms]: Deleted successfully");
        }}
      />
    </div></div>
  );
};
export default SettingsContent;
