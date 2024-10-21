import { cal } from "@/cal/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { db } from "prisma/client";

export const dynamic = "force-dynamic";
export default async function ExpertDetails({ params }: { params: { expertUsername: string } }) {
  const expert = await db.user.findUnique({
    where: { username: params.expertUsername },
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

  if (!expert?.calAccount?.username) {
    console.warn("Expert not found", params.expertUsername);
    return <div>Expert not found</div>;
  }

  const eventTypes = await cal({
    user: {
      calAccessToken: expert.calAccessToken,
      calRefreshToken: expert.calRefreshToken,
      calAccountId: expert.calAccountId,
      id: expert.id,
    },
  }).get("/v2/event-types/{username}/public", {
    path: {
      username: expert.calAccount.username,
    },
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data: haircutImages, error } = await supabase.storage.from("haircuts").list(`${expert.id}/`);

  let imageUrls: string[] = [];

  if (error) {
    console.error("Error fetching haircut images:", error);
  } else if (haircutImages) {
    imageUrls = haircutImages.map(
      (file) => supabase.storage.from("haircuts").getPublicUrl(`${expert.id}/${file.name}`).data.publicUrl
    );
  }

  return (
    <div className="mb-8 mt-12 flex flex-col gap-10 max-w-7xl mx-auto">
      {/* Hero Section with Image */}
      <div className="relative mb-8 w-full">
        <div className="relative flex justify-center items-center h-96 rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-5">
          <Image
            alt={`${expert.name}'s profile picture`}
            className="object-cover w-full h-full opacity-90"
            src={`avatars/${expert.id}`}
            height={500}
            width={1200}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold">{expert.name}</h1>
          </div>
        </div>
      </div>

      {/* About + Book Now Section */}
      <div className="w-full px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section (left) */}
        <div className="md:col-span-1">
          <Card className="h-full w-full shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  alt={`${expert.name}'s avatar`}
                  className="rounded-full w-16 h-16 object-cover"
                  src={`avatars/${expert.id}`}
                  height={64}
                  width={64}
                />
                <CardTitle className="text-xl font-bold">About {expert.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{expert.bio}</p>
            </CardContent>
          </Card>
        </div>

        {/* Book Now Section (right) */}
        <div className="md:col-span-2">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Book with {expert.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  See available services and book an appointment below.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {eventTypes.data.map((eventType) => (
                  <div key={eventType.id} className="p-5 bg-primary/20 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-medium text-lg capitalize">{eventType.title}</div>
                    <Link href={`/${expert.username}/${eventType.slug}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
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
        <Card className="w-full shadow-lg rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Haircuts by {expert.name}</CardTitle>
            <CardDescription className="text-sm">See some of the amazing haircuts done on previous clients.</CardDescription>
          </CardHeader>
          <CardContent className="pb-3 px-5 lg:px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 md:grid-cols-3">
              {imageUrls.length === 0
                ? // Show skeletons if no images are loaded yet
                  Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[350px] w-[350px] rounded-sm" />
                  ))
                : // Show actual images once they're available
                  imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <img
                        alt={`Haircut ${index + 1}`}
                        className="h-[350px] w-[350px] rounded-lg object-cover shadow-lg hover:scale-105 transition-transform"
                        src={imageUrl}
                      />
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



