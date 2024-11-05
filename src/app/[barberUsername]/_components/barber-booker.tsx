"use client";
import { Booker, useEventTypes } from "@calcom/atoms";
import type { CalAccount, User } from "@prisma/client";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

type BookerProps = Parameters<typeof Booker>[number];

export const BarberBooker = (
  props: {
    className?: string;
    calAccount: Pick<CalAccount, "username">;
    barber: Pick<User, "name" | "username">;
  } & Partial<BookerProps>
) => {
  const { className, calAccount, barber, isTeamEvent, ...rest } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("eventSlug");
  const rescheduleUid = searchParams.get("rescheduleUid") ?? undefined;
  const { isLoading: isLoadingEvents, data: eventTypes } = useEventTypes(calAccount.username ?? "");

  const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: "easeOut" }
  };

  if (!calAccount.username) {
    return (
      <motion.div 
        className="w-full text-center"
        {...fadeUpAnimation}
      >
        Sorry. We couldn&apos;t find this barber&apos; user.
      </motion.div>
    );
  }

  if (isLoadingEvents) {
    return (
      <motion.div 
        className="flex items-center justify-center"
        {...fadeUpAnimation}
      >
        <Loader className="z-50 animate-spin" />
      </motion.div>
    );
  }

  if (!eventTypes?.length) {
    return (
      <motion.div 
        className="w-full text-center"
        {...fadeUpAnimation}
      >
        Sorry. Unable to load {barber.name}&apos;s availabilities.
      </motion.div>
    );
  }

  return (
    <motion.div
      {...fadeUpAnimation}
    >
      <Booker
        customClassNames={{
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
        eventSlug={eventTypes.find(e => e.slug === eventSlug)?.slug ?? eventTypes[0]?.slug ?? ""}
        username={calAccount.username}
        onCreateBookingSuccess={(booking) => {
          toast.success("Booking successful!");
          router.push(
            `/${barber.username}/booking/${booking.data.uid}${booking.data.fromReschedule ? `?${new URLSearchParams({ fromReschedule: booking.data.fromReschedule }).toString()}` : ""}`
          );
        }}
        rescheduleUid={rescheduleUid}
        {...rest}
      />
    </motion.div>
  );
};

export default BarberBooker;