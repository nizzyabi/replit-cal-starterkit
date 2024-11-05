import BarberBooker from "../_components/barber-booker";
import { cal } from "@/cal/api";
import Image from "next/image";
import { db } from "prisma/client";

export const dynamic = "force-dynamic";

export default async function BookerPage({
  params,
}: {
  params: { barberUsername: string; eventSlug: string };
}) {
  const barber = await db.user.findUnique({
    where: { username: params.barberUsername },
    select: {
      id: true,
      calAccessToken: true,
      calRefreshToken: true,
      calAccountId: true,
      name: true,
      username: true,
      calAccount: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  if (!barber?.calAccount?.username) {
    console.warn("Barber not found", params.barberUsername);
    return <div>Barber not found</div>;
  }
  const eventType = await cal({
    user: {
      calAccessToken: barber.calAccessToken,
      calRefreshToken: barber.calRefreshToken,
      calAccountId: barber.calAccountId,
      id: barber.id,
    },
  }).get("/v2/event-types/{username}/{eventSlug}/public", {
    path: {
      username: barber.calAccount.username,
      eventSlug: params.eventSlug,
    },
    query: {
      isTeamEvent: false,
    },
  });
  if (eventType.status === "error") {
    console.warn(
      `[BookerPage] Event not found for event slug '${params.eventSlug}'. Check logs above for more info.`
    );
    return <div>Event not found</div>;
  }

  const descriptionWithoutHtmlTags = eventType.data?.description.replace(/<[^>]*>?/gm, "");
  return (
    <div className="mb-4 flex flex-1 flex-col items-center gap-4 overflow-auto">
      
      <div className="mx-auto grid w-full gap-2 px-8 sm:px-10 lg:px-12 2xl:px-36 bg-transparent md:mt-40">
        {Boolean(barber.calAccount) && (
          <BarberBooker
            calAccount={{ username: barber.calAccount.username }}
            barber={{
              name: barber.name,
              username: barber.username,
            }}
            eventSlug={eventType.data?.slug}
          />
        )}
      </div>
    </div>
  );
}
