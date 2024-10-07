"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader, Scissors } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import { type db } from "prisma/client";
import { Fragment, useState } from "react";
import React, { Suspense } from "react";
import { Balancer } from "react-wrap-balancer";

export default function ResultsCard({
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

  return (
    <Link href={"/" + slug} className="col-span-1 flex">
      <Card className="mx-auto w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out">
        <div className="relative">
          <div
            className={cn(
              "h-[280px] w-full rounded-t-md transition-all duration-300",
              error && "bg-muted",
              isLoading && "bg-muted"
            )}>
            <Image
              src={`/avatars/${userId}?width=320&height=240`}
              alt={title}
              className="h-full w-full rounded-t-md object-cover transition-opacity duration-300 ease-in-out"
              height={240}
              width={320}
              onError={(e) => {
                setError(e.error);
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-semibold text-white">
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
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Scissors className="mr-2 h-5 w-5 text-gray-500" />
              
            </div>
            <Button variant="outline" size="sm">
              Book Now
            </Button>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

type UsersWithoutFilterOptions = Awaited<ReturnType<typeof db.user.findMany>>;

export function Results(props: { experts: UsersWithoutFilterOptions; signedOut: JSX.Element }) {
  const [query] = useQueryState("q", parseAsString);

  const experts = props.experts.filter((expert) => {
    if (!query) return true;
    return (
      expert?.name?.toLowerCase().includes(query?.toLowerCase()) ||
      expert?.bio?.toLowerCase().includes(query?.toLowerCase())
    );
  });

  return (
    <Fragment>
      <div
        className="flex min-h-[600px] flex-col justify-center bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: "url('/barber.svg')" }}>
        <div className="container  flex flex-col items-center justify-center gap-12">
          <h1 className="font-display text-7xl font-extrabold tracking-wide text-white shadow-xl">
            <Balancer>Get your dream haircut</Balancer>
          </h1>
        </div>
      </div>
      <div className="mt-10 flex-1">
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
                <div className="grid grid-cols-1 gap-5 space-x-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {!query && props.signedOut}
                  {experts.length &&
                    experts.map(({ image, username, name, bio, id }) => (
                      <ResultsCard
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
