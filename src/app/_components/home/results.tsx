"use client";

import { SearchBar } from "../search-bar";
import SidebarItem from "./sidebar-item";
import { filterOptions } from "@/app/_hardcoded";
import { filterSearchParamSchema } from "@/app/_searchParams";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { type FilterOption, type User } from "@prisma/client";
import { ListFilter, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState, parseAsString, parseAsJson } from "nuqs";
import { type db } from "prisma/client";
import { Fragment, type ReactEventHandler, useState, type SyntheticEvent } from "react";
import React, { Suspense } from "react";
import { Balancer } from "react-wrap-balancer";
import { prop, uniqueBy } from "remeda";

export default function ResultsCard({
  slug,
  userId,
  title,
  description,
  query,
}: {
  slug: string;
  userId?: string;
  title: string;
  description: string;
  query?: string;
}) {
  const queryIndexTitle = title.toLowerCase().indexOf(query?.toLowerCase() ?? "");
  const queryIndexDescription = description.toLowerCase().indexOf(query?.toLowerCase() ?? "");
  const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={"/" + slug} className="col-span-1 flex">
      <Card className="mx-auto overflow-hidden">
        <div
          className={cn(
            "h-[265px] w-[380px] rounded-md",
            error && "bg-muted",
            isLoading && "animate-pulse bg-muted"
          )}>
          {!error && (
            <Image
              src={`/hero.jpg`}
              alt={title}
              className="h-full w-full rounded-md object-cover"
              height={265}
              width={380}
              onLoadingComplete={() => setIsLoading(false)}
              onError={setError}
            />
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl">
            {/* this highlights the search query for the title */}
            {queryIndexTitle != undefined && query ? (
              <>
                {title.substring(0, queryIndexTitle)}
                <span className="bg-yellow-300">
                  {title.substring(queryIndexTitle, queryIndexTitle + query.length)}
                </span>
                {title.substring(queryIndexTitle + query.length)}
              </>
            ) : (
              title
            )}
          </CardTitle>
          <CardDescription>
            {/* this highlights the search query for the title */}
            {queryIndexDescription != undefined && query ? (
              <>
                {description.substring(0, queryIndexDescription)}
                <span className="bg-yellow-300">
                  {description.substring(queryIndexDescription, queryIndexDescription + query.length)}
                </span>
                {description.substring(queryIndexDescription + query.length)}
              </>
            ) : (
              description
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
type UsersWithFilterOptions = Awaited<
  ReturnType<
    typeof db.user.findMany<{
      include: { selectedFilterOptions: { include: { filterOption: true } } };
    }>
  >
>;
export function Results(props: { experts: UsersWithFilterOptions; signedOut: JSX.Element }) {
  const [query] = useQueryState("q", parseAsString);

  // this is the query string search:
  const experts = props.experts.filter((expert) => {
    if (!query) return true;
    return (
      expert?.name?.toLowerCase().includes(query?.toLowerCase()) ||
      expert?.bio?.toLowerCase().includes(query?.toLowerCase())
    );
  });

  return (
    <Fragment>
      <div className="flex-1">
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
                <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-3 2xl:grid-cols-4">
                  {!query && props.signedOut}
                  {experts.length &&
                    experts.map(({ username, name, bio, id }) => (
                      <ResultsCard
                        key={username}
                        slug={username ?? ""}
                        userId={id ?? ""}
                        title={name ?? "Your title"}
                        description={bio ?? "Your bio"}
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
