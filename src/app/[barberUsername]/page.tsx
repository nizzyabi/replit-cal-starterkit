import { cal } from "@/cal/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { db } from "prisma/client";

export const dynamic = "force-dynamic";
export default async function BarberDetails({ params }: { params: { barberUsername: string } }) {
  const barber = await db.user.findUnique({
    where: { username: params.barberUsername },
    select: {
      haircutImages: true,
      image: true,
      id: true,
      calAccessToken: true,
      calRefreshToken: true,
      calAccountId: true,
      name: true,
      username: true,
      bio: true,
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

  const eventTypes = await cal({
    user: {
      calAccessToken: barber.calAccessToken,
      calRefreshToken: barber.calRefreshToken,
      calAccountId: barber.calAccountId,
      id: barber.id,
    },
  }).get("/v2/event-types/{username}/public", {
    path: {
      username: barber.calAccount.username,
    },
  });

  console.log("Raw event types:", eventTypes.data);

  const customEventTypes = eventTypes.data.slice(4);

  console.log("Filtered event types:", customEventTypes);

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data: haircutImages, error } = await supabase.storage.from("haircuts").list(`${barber.id}/`);

  let imageUrls: string[] = [];

  if (error) {
    console.error("Error fetching haircut images:", error);
  } else if (haircutImages) {
    imageUrls = haircutImages.map(
      (file) => supabase.storage.from("haircuts").getPublicUrl(`${barber.id}/${file.name}`).data.publicUrl
    );
  }

  return (
    <div className="mx-auto mb-8 mt-12 flex max-w-7xl flex-col gap-10">
      {/* Hero Section with Image */}
      <div className="relative mb-8 w-full">
        <div className="relative mx-5 flex h-96 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <Image
            alt={`${barber.name}'s profile picture`}
            className="h-full w-full object-cover opacity-90"
            src={`avatars/${barber.id}`}
            height={500}
            width={1200}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-4xl font-bold text-white">{barber.name}</h1>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 px-5 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="h-full w-full overflow-hidden rounded-lg shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  alt={`${barber.name}'s avatar`}
                  className="h-16 w-16 rounded-full object-cover"
                  src={`avatars/${barber.id}`}
                  height={64}
                  width={64}
                />
                <CardTitle className="text-xl font-bold">About {barber.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="opacity-50">{barber.bio}</p>
            </CardContent>
          </Card>
        </div>

        {/* Book Now Section (right) */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Book with {barber.name}</CardTitle>
                <CardDescription className="text-sm opacity-50">
                  See available services and book an appointment below.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {customEventTypes.map((eventType) => (
                  <div
                    key={eventType.id}
                    className="flex items-center justify-between rounded-lg bg-primary/20 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="text-lg font-medium capitalize">{eventType.title}</div>
                    <Link href={`/${barber.username}/${eventType.slug}`}>
                      <Button className="transform rounded-lg bg-orange-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-orange-600">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Haircut Gallery Section */}
      <div className="w-full px-5">
        <Card className="w-full overflow-hidden rounded-lg shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-extrabold text-white">Haircuts by {barber.name}</CardTitle>
            <CardDescription className="text-md text-gray-400">
              See some of the amazing haircuts done on previous clients.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 lg:px-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {imageUrls.length === 0
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[350px] w-[350px] rounded-lg" />
                  ))
                : imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        alt={`Haircut ${index + 1}`}
                        className="h-[350px] w-[350px] rounded-lg object-cover shadow-lg transition-transform hover:scale-105"
                        src={imageUrl}
                      />
                      <span className="mt-3 text-sm text-white">Haircut Style {index + 1}</span>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
