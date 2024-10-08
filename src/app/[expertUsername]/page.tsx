import { cal } from "@/cal/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";
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
  if (eventTypes.status === "error") {
    console.warn(
      `[ExpertDetails] Event not found for expert username '${params.expertUsername}'. Check logs above for more info.`
    );
  }
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // Fetch haircut image URLs
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
    <div className="mb-4 mt-8 flex flex-1 flex-col items-center gap-4 overflow-auto">
      <div className="w-full max-w-6xl px-8 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Card: Book with expert */}
          <div>
            {eventTypes.status === "error" ? (
              <div>User Events not found</div>
            ) : (
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>Book with {expert.name}</CardTitle>
                  <CardDescription>See available services and book an appointment below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>
                          <span className="sr-only">Availability</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventTypes.data.map((eventType) => (
                        <TableRow key={eventType.id}>
                          <TableCell>
                            <Link href={`/${expert.username}/${eventType.slug}`}>
                              <div className="font-medium capitalize">{eventType.title}</div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/${expert.username}/${eventType.slug}`}>
                              <Button variant="ghost" size="icon">
                                <ArrowRight className="size-5 hover:size-6" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing{" "}
                    <strong>
                      {eventTypes.data.length > 0 ? 1 : 0}-
                      {eventTypes.data.length > 10 ? 10 : eventTypes.data.length}
                    </strong>{" "}
                    of <strong>{eventTypes.data.length}</strong> event types
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Second Card: About Expert */}
          <div>
            {eventTypes.status === "error" ? (
              <div>User Events not found</div>
            ) : (
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>About {expert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Expert image"
                    className="w-full h-full rounded-lg object-fi;;"
                    src={`avatars/${expert.id}`}
                    height={800}
                    width={800}
                  />
                </CardContent>
                <CardFooter>{expert.bio}</CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Third Card: Haircuts */}
      <div className="w-full max-w-6xl px-8 sm:px-10 lg:px-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Haircuts done by {expert.name}</CardTitle>
            <CardDescription>See some of my haircuts done on previous clients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 justify-items-center gap-4 pt-5 md:grid-cols-3">
              {imageUrls.length === 0
                ? // Show skeletons if no images are loaded yet
                  Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[350px] w-[350px] rounded-md" />
                  ))
                : // Show actual images once they're available
                  imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <img
                        alt={`Haircut ${index + 1}`}
                        className="h-[350px] w-[350px] rounded-md object-cover shadow-sm"
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
