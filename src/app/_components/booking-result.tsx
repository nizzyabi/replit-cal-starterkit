"use client";

import { stripCalOAuthClientIdFromEmail, stripCalOAuthClientIdFromText } from "@/cal/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCancelBooking, useBooking} from "@calcom/atoms";
import dayjs from "dayjs";
import { Check, ExternalLinkIcon, Loader, X } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import type { BookingStatus } from "node_modules/@calcom/atoms/dist/packages/prisma/enums";

export const BookingResult = (props: {
  barberusername?: string;
  bookingUid?: string;
  fromReschedule?: string;
}) => {
  const params = useParams<{ barberUsername: string; bookingUid: string }>();
  const barberUsername = props?.barberusername ?? params?.barberUsername;
  const bookingUid = props?.bookingUid ?? params?.bookingUid;
  const searchParams = useSearchParams();
  const fromReschedule = props?.fromReschedule ?? searchParams.get("fromReschedule");
  const { isLoading, data: booking, refetch } = useBooking(bookingUid ?? "");
  // TODO: We're doing this to cast the type since @calcom/atoms doesn't type them properly
  const bookingStatus = booking && "status" in booking ? (booking.status as BookingStatus) : undefined;
  const { mutate: cancelBooking } = useCancelBooking({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async () => {
      await refetch();
    },
  });
  //   [@calcom] The API returns the UID of the previous booking in case you'd like to show changed booking details in your UI.
  const bookingPrevious = useBooking(fromReschedule ?? "");
  if (!bookingUid) {
    return <div>No Booking UID.</div>;
  }

  if (isLoading) {
    return <Loader className="z-50 animate-spin place-self-center" />;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const what = stripCalOAuthClientIdFromText(booking.title) ?? booking.title;
  const formerWhat = bookingPrevious?.data
    ? stripCalOAuthClientIdFromText(bookingPrevious?.data?.title)
    : null;

  const when = `${dayjs(booking.start).format("dddd, MMMM DD YYYY @ h:mma")} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
  const formerWhen = bookingPrevious.data
    ? `${dayjs(bookingPrevious.data.start).format("dddd, MMMM DD YYYY @ h:mma")} (${bookingPrevious?.data?.user?.timeZone})`
    : null;

  const who = {
    host: `Barber: ${booking?.hosts?.[0]?.name} ${stripCalOAuthClientIdFromEmail(booking?.user?.email ?? "")}`,
    attendees: booking.attendees.map(
      (attendee) => `Booker: ${attendee.name ? `${stripCalOAuthClientIdFromText(attendee.name)}` : ""}`
    ),
  };
  const formerWho = bookingPrevious?.data
    ? {
        host: `${bookingPrevious.data?.user?.name} (Host) - ${stripCalOAuthClientIdFromEmail(bookingPrevious.data?.user?.email ?? "")}`,
        attendees: bookingPrevious.data.attendees.map(
          (
            previousAttendee
          ) => `${previousAttendee.name ? `${stripCalOAuthClientIdFromText(previousAttendee.name)} - ` : ""} 
${stripCalOAuthClientIdFromEmail(previousAttendee.email)}`
        ),
      }
    : null;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-4 px-8">
        <div className="flex items-center justify-center space-x-2">
          {bookingStatus?.toLowerCase() === "cancelled" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/50">
                <X className="size-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Meeting Cancelled</CardTitle>
            </div>
          )}
          {bookingStatus?.toLowerCase() === "accepted" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success">
                <Check className="size-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Meeting scheduled successfully</CardTitle>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 px-8 pt-2 text-sm">
        <Separator className="mb-8" />
        <div className="grid gap-3">
          <ul className="grid gap-3">
            {/* <li className="flex flex-col">
              <span className="space-y-0.5 font-semibold">What</span>
              {formerWhat !== what && (
                <span className={cn("text-muted-foreground line-through")}>{formerWhat}</span>
              )}
              <span
                className={cn(
                  "text-muted-foreground",
                  bookingStatus?.toLowerCase() === "cancelled" && "line-through"
                )}>
                {what}
              </span>
            </li> */}
            <li className="flex flex-col">
              <span className="space-y-0.5 font-semibold">When</span>
              {formerWhen !== when && (
                <span className={cn("text-muted-foreground line-through")}>{formerWhen}</span>
              )}
              <span
                className={cn(
                  "text-muted-foreground",
                  bookingStatus?.toLowerCase() === "cancelled" && "line-through"
                )}>
                {when}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">Who</span>
              <ul className="space-y-0.5">
                <li
                  className={cn(
                    "text-muted-foreground",
                    bookingStatus?.toLowerCase() === "cancelled" && "line-through"
                  )}>
                  {who.host}
                </li>
                {who.attendees.map((attendee, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "text-muted-foreground",
                      bookingStatus?.toLowerCase() === "cancelled" && "line-through"
                    )}>
                    {attendee}
                    {formerWho?.attendees?.findIndex((formerAttendee) => formerAttendee === attendee) ===
                      -1 && (
                      <Badge className="ml-2 px-1.5 py-[0.05rem] text-xs font-normal leading-none">New</Badge>
                    )}
                  </li>
                ))}
                {formerWho?.attendees?.map(
                  (formerAttendee, idx) =>
                    who.attendees.findIndex((attendee) => attendee === formerAttendee) === -1 && (
                      <li
                        key={idx}
                        className={cn(
                          "text-muted-foreground",
                          who.attendees.findIndex((attendee) => attendee === formerAttendee) === -1 &&
                            "line-through"
                        )}>
                        {formerAttendee}
                      </li>
                    )
                )}
              </ul>
            </li>
            <li className="flex flex-col">
              <span className="space-y-0.5 font-semibold">Where</span>
              <span className="text-muted-foreground">2203 Sunset Blvd, Los Angeles, CA 90026</span>
            </li>
            {booking.description && (
              <li className="flex flex-col">
                <span className="space-y-0.5 font-semibold">Event Description</span>
                {booking.description !== bookingPrevious.data?.description && (
                  <span className={cn("text-muted-foreground line-through")}>
                    {bookingPrevious?.data?.description}
                  </span>
                )}
                <span
                  className={cn(
                    "text-muted-foreground",
                    bookingStatus?.toLowerCase() === "cancelled" && "line-through"
                  )}>
                  {booking.description}
                </span>
              </li>
            )}
          </ul>
        </div>
        <Separator className="mt-8" />
      </CardContent>
      <CardFooter className="flex flex-col px-8">
        {bookingStatus?.toLowerCase() === "cancelled" ? (
          <div>
            <span>Want to book {booking?.user?.name}?</span>
            <span>
              {" "}
              See{" "}
              <Link href={`/${barberUsername}/${bookingUid}`} className="underline">
                availabilities
              </Link>
            </span>
          </div>
        ) : (
          <div>
            <span>Need to make changes?</span>
            <span>
              {" "}
              {/* <Link href={`/${barberUsername}?rescheduleUid=${bookingUid}`} className="underline">
                Reschedule
              </Link>{" "} */}
              {/* or{" "} */}
              <div
                className="cursor-pointer underline"
                onClick={() => {
                  return cancelBooking({
                    id: booking.id,
                    uid: booking.uid,
                    cancellationReason: "User request",
                    allRemainingBookings: true,
                  });
                }}>
                Cancel
              </div>
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingResult;