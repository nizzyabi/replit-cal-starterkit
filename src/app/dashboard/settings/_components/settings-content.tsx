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
    <div className="grid gap-6 [&>div]:text-white [&>div]:shadow-sm mt-4">

      <AvailabilitySettings
        customClassNames={{
          containerClassName: "!bg-[#0C0A09] !text-white !border border-orange-500/30 rounded-xl shadow-md", 
          ctaClassName: "border border-orange-500/30 p-4 rounded-xl text-white shadow-md", 
          editableHeadingClassName: "text-white text-3xl font-bold mb-2", 
          subtitlesClassName: "text-gray-400 mt-1", 
          formClassName: "bg-[#0C0A09] text-white p-6 rounded-lg shadow-lg",
          
          // Switch styling for native look
          hiddenSwitchClassname: {
            container: "switch-container transition-all hover:bg-[#FF9800]", // Only affect background on hover
            thumb: "switch-thumb hover:shadow-md border rounded-full", // Only add shadow on hover
          },

          timezoneSelectClassName: "text-white bg-gray-800 p-2 rounded-md", 

          scheduleClassNames: {
            scheduleContainer: "", 
            
            scheduleDay: "text-white font-semibold", 
            timeRanges: "text-white", 
            labelAndSwitchContainer: "flex items-center justify-between p-2 rounded-lg ", 
          },

          deleteButtonClassname: "bg-red-500 text-white hover:bg-red-600 transition-all rounded-lg p-2 shadow-md hover:shadow-lg",
        }}
        onUpdateSuccess={() => console.log("Updated successfully")}
        onUpdateError={() => console.log("Update error")}
        onDeleteError={() => console.log("Delete error")}
        onDeleteSuccess={() => console.log("Deleted successfully")}
      />


    </div></div>
  );
};
export default SettingsContent;
