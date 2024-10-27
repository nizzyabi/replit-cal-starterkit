"use client";

import { Booker, useEventTypes } from "@calcom/atoms";
import type { CalAccount, User } from "@prisma/client";
import { Loader, MapPinIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

/**
 * [@calcom] Make sure to wrap your app with our `CalProvider` to enable the use of our hooks.
 * @link https://cal.com/docs/platform/quick-start#5.3-setup-root-of-your-app
 */
type BookerProps = Parameters<typeof Booker>[number];
export const ExpertBooker = (
  props: {
    className?: string;
    calAccount: Pick<CalAccount, "username">;
    expert: Pick<User, "name" | "username">;
  } & Partial<BookerProps>
) => {
  const { className, calAccount, expert, isTeamEvent, ...rest } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("eventSlug");
  const rescheduleUid = searchParams.get("rescheduleUid") ?? undefined;
  const { isLoading: isLoadingEvents, data: eventTypes } = useEventTypes(calAccount.username ?? "");
  if (!calAccount.username) {
    return <div className="w-full text-center">Sorry. We couldn&apos;t find this barber&apos; user.</div>;
  }
  if (isLoadingEvents) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="z-50 animate-spin" />
      </div>
    );
  }
  if (!eventTypes?.length) {
    return (
      <div className="w-full text-center">Sorry. Unable to load ${expert.name}&apos;s availabilities.</div>
    );
  }

  return (
    <>
      <Booker
        locationUrl='25 Carbery Drive'
        customClassNames={{
          // Main containers
          atomsWrapper: "",
          bookerContainer: "!bg-[#0C0A09] !border !border-solid !border-orange-500/30 !rounded-lg custom-grid !text-white",
          datePickerCustomClassNames: {
            datePickerDatesActive: "!bg-orange-500 hover:opacity-80 !text-white",
            datePickerContainer: "!bg-[#0C0A09] !p-4 !rounded-xl !text-white",
          },
          eventMetaCustomClassNames: {
            eventMetaTitle: "!text-white !text-2xl !font-bold !mb-2",
            eventMetaContainer: "!p-6 !rounded-xl !text-white",
            eventMetaTimezoneSelect: ""
          },
          availableTimeSlotsCustomClassNames: {
            availableTimeSlotsHeaderContainer: "!bg-[#0C0A09] !p-4 !text-white",
            availableTimes:
              "!bg-orange-500 hover:!bg-orange-600 !rounded-lg !font-medium !transition-all !duration-200 !text-white",
          },
        }}
        // use url params to get the correct event-type
        eventSlug={eventTypes.find(e => e.slug === eventSlug)?.slug ?? eventTypes[0]?.slug ?? ""}
        username={calAccount.username}
        onCreateBookingSuccess={(booking) => {
          toast.success("Booking successful!");
          router.push(
            `/${expert.username}/booking/${booking.data.uid}${booking.data.fromReschedule ? `?${new URLSearchParams({ fromReschedule: booking.data.fromReschedule }).toString()}` : ""}`
          );
        }}
        rescheduleUid={rescheduleUid}
        {...rest}
      />
    </>
  );
};
export default ExpertBooker;
