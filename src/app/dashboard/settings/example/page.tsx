'use client';
import { Inter } from "next/font/google";
// eslint-disable-next-line @calcom/eslint/deprecated-imports-next-router
import { useState } from "react";

import {
  useEventTypes,
  useTeamEventTypes,
  useTeams,
  EventTypeSettings,
  CreateEventType,
} from "@calcom/atoms";

const inter = Inter({ subsets: ["latin"] });

export default function Bookings(props: { calUsername: string; calEmail: string }) {
  const [eventTypeId, setEventTypeId] = useState<number | null>(null);
  const [isTeamEvent, setIsTeamEvent] = useState<boolean>(false);
  const { isLoading: isLoadingEvents, data: eventTypes, refetch } = useEventTypes(props.calUsername);
  const { data: teams } = useTeams();
  const {
    isLoading: isLoadingTeamEvents,
    data: teamEventTypes,
    refetch: refetchTeamEvents,
  } = useTeamEventTypes(teams?.[0]?.id || 0);
  const urlParams = new URLSearchParams(window.location.search);
  const rescheduleUid = urlParams.get('rescheduleUid') || '';

  return (
    <main
      className={`flex min-h-screen flex-col ${inter.className} main text-default flex min-h-full w-full flex-col items-center overflow-visible`}>
      <div>
        <h1 className="mx-10 my-4 text-2xl font-semibold">
          EventTypes{eventTypeId ? `: ${eventTypeId}` : ""}
        </h1>

        {isLoadingEvents && !eventTypeId && <p>Loading...</p>}

        {!isLoadingEvents && !eventTypeId && Boolean(eventTypes?.length) && !rescheduleUid && (
          <div className="flex flex-col gap-4">
            {eventTypes?.map(
              (event: { id: number; slug: string; title: string; lengthInMinutes: number }) => {
                const formatEventSlug = event.slug
                  .split("-")
                  .map((item) => `${item[0]?.toLocaleUpperCase()}${item.slice(1)}`)
                  .join(" ");

                return (
                  <div
                    onClick={() => {
                      setEventTypeId(event.id);
                      setIsTeamEvent(false);
                    }}
                    className="mx-10 w-[80vw] cursor-pointer rounded-md border-[0.8px] border-black px-10 py-4"
                    key={event.id}>
                    <h1 className="text-lg font-semibold">{formatEventSlug}</h1>
                    <p>{`/${event.slug}`}</p>
                    <span className="border-none bg-gray-800 px-2 text-white">{event?.lengthInMinutes}</span>
                  </div>
                );
              }
            )}
          </div>
        )}

       
        {eventTypeId && (
          <div>
            <EventTypeSettings
              customClassNames={{ atomsWrapper: "!w-[50vw] !m-auto" }}
              allowDelete={true}
              id={eventTypeId}
              tabs={["setup", "limits", "recurring", "advanced", "availability", "team", "payments"]}
              onSuccess={(eventType) => {
                setEventTypeId(null);
                refetch();
              }}
              onError={(eventType, error) => {
                console.log(eventType);
                console.error(error);
              }}
              onDeleteSuccess={() => {
                refetch();
                refetchTeamEvents();
                setEventTypeId(null);
              }}
              onDeleteError={console.error}
            />
          </div>
        )}

        {!eventTypeId && (
          <div className="mt-8 flex flex-row items-center justify-center gap-24">
            <div className="flex w-[30vw] flex-col gap-2">
              <h1 className="font-semibold">Create Event Type</h1>
              <CreateEventType
                
                customClassNames={{
                  atomsWrapper: "border p-4 shadow-md rounded-md bg-primary text-white",
                  buttons: { container: "justify-center", submit: "bg-orange-500", cancel: "bg-red-500" },
                }}
                onError={(err) => {
                  console.log("Error while creating eventType", err);
                }}
                onCancel={() => {
                  console.log("Clicked on cancel button")
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}