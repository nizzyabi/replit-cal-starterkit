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
import { motion } from "framer-motion";
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
      <Card className="mx-auto overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.05]">
        <div
          className={cn(
            "h-[365px] w-[480px] rounded-md transition-all duration-300",
            error && "bg-muted",
            isLoading && "bg-muted"
          )}>
          <Image
            src={`/avatars/${userId}?width=380&height=265`}
            alt={title}
            className="h-full w-full rounded-t-md object-cover transition-opacity duration-300 ease-in-out"
            height={265}
            width={380}
            onError={(e) => {
              setError(e.error);
              setIsLoading(false);
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">
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
                <h1 className="my-7 text-center text-5xl font-bold">Our Barbers</h1>
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
