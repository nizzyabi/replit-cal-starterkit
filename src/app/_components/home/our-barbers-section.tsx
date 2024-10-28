"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import { type db } from "prisma/client";
import { Fragment, useEffect, useState } from "react";
import React, { Suspense } from "react";

export default function OurBarbersCard({
  slug,
  userId,
  title,
  query,
}: {
  slug: string;
  userId?: string;
  title: string;
  query?: string;
}) {
  const queryIndexTitle = title.toLowerCase().indexOf(query?.toLowerCase() ?? "");
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [randomRating, setRandomRating] = useState(4.8); // Default rating

  useEffect(() => {
    // Generate a random rating between 4.0 and 5.0
    const rating = (Math.random() * 1 + 4).toFixed(1);
    setRandomRating(rating ? parseFloat(rating) : 4.4);
  }, []);
  
  return (
    <div className="col-span-1 flex">
      <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <div
            className={cn(
              "h-[280px] w-full rounded-t-lg transition-all duration-300",
              error && "bg-muted",
              isLoading && "bg-muted"
            )}
          >
            <Image
              src={`/avatars/${userId}?width=320&height=240`}
              alt={title}
              className="h-full w-full rounded-t-lg object-cover transition-opacity duration-300 ease-in-out"
              height={240}
              width={320}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {queryIndexTitle !== -1 && query ? (
                  <>
                    {title.substring(0, queryIndexTitle)}
                    <span className="bg-yellow-300 text-black">
                      {title.substring(queryIndexTitle, queryIndexTitle + query.length)}
                    </span>
                    {title.substring(queryIndexTitle + query.length)}
                  </>
                ) : (
                  title
                )}
              </h3>
              <div className="text-[#facc14] flex items-center">
                <StarIcon className="h-5 w-5" fill='#facc14' />
                <span className="ml-1">{randomRating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="">
              </div>
              <Link href={"/" + slug}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary hover:bg-primary text-white hover:text-white transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

type UsersWithoutFilterOptions = Awaited<ReturnType<typeof db.user.findMany>>;

export function OurBarbersSection(props: { barbers: UsersWithoutFilterOptions; signedOut: JSX.Element }) {
  const [query] = useQueryState("q", parseAsString);

  const barbers = props.barbers.filter((barber) => {
    if (!query) return true;
    return (
      barber?.name?.toLowerCase().includes(query?.toLowerCase()) ||
      barber?.bio?.toLowerCase().includes(query?.toLowerCase())
    );
  });

  return (
    <Fragment>
      <div>
        <h1 className="text-5xl font-semibold pt-10 text-center">Our Barbers</h1>
      </div>
      <div className="mt-5 flex-1">
        <div className="sm:my-10">
          <Suspense
            fallback={
              <div className="relative h-max w-full max-w-sm place-self-center">
                <div className="absolute inset-0 z-40 grid rounded-2xl bg-slate-900 text-white">
                  <Loader className="z-50 animate-spin place-self-center" />
                </div>
              </div>
            }>
            <div className="block sm:flex">
              <main className="w-full p-4 pt-0">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl">
                  {barbers.length &&
                    barbers.map(({ username, name, id }) => (
                      <OurBarbersCard
                        key={username}
                        slug={username ?? ""}
                        userId={id ?? ""}
                        title={name ?? "Your title"}
                        query={query ?? undefined}
                      />
                    ))}
                </div>
              </main>
            </div>
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
}
