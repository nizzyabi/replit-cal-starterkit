"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader, StarIcon, Banknote } from "lucide-react";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import { type db } from "prisma/client";
import { Fragment, useEffect, useState, Suspense } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";

export default function OurBarbersCard({
  slug,
  userId,
  title,
  query,
  imageSrc,
  isExample,
  costPerHairCut ,
}: {
  slug: string;
  userId?: string;
  title: string;
  query?: string;
  imageSrc?: string; 
  isExample?: boolean;
  costPerHairCut?: any;
}) {
  const queryIndexTitle = title.toLowerCase().indexOf(query?.toLowerCase() ?? "");
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [randomRating, setRandomRating] = useState(4.8); 

  useEffect(() => {
    const rating = (Math.random() * 1 + 4).toFixed(1);
    setRandomRating(rating ? parseFloat(rating) : 4.4);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="col-span-1 flex"
    >
      <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <div
            className={cn(
              "h-[280px] w-full rounded-t-lg transition-all duration-300",
              error && "bg-muted",
              isLoading && "bg-muted"
            )}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="h-full w-full rounded-t-lg object-cover transition-opacity duration-300 ease-in-out"
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <Image
                src={`/avatars/${userId}?width=320&height=240`}
                alt={title}
                className="h-full w-full rounded-t-lg object-cover transition-opacity duration-300 ease-in-out"
                height={240}
                width={320}
                onLoad={() => setIsLoading(false)}
              />
            )}
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
                <StarIcon className="h-5 w-5" fill="#facc14" />
                <span className="ml-1">{randomRating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {costPerHairCut ? (
      (<div className="rounded-md border-green-600 bg-green-200/40 px-2.5 py-1 text-green-600/80">
        <span className="flex items-center justify-center text-green-600">
          <Banknote className="mr-1.5 h-5 w-5" />${costPerHairCut}
        </span>
      </div>
              )
              ) : (
                <div></div>
              )}
              <Link href={isExample ? "#" : `/${slug}`} passHref>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary hover:bg-primary text-white hover:text-white transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  disabled={isExample}
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

type UsersWithoutFilterOptions = Awaited<ReturnType<typeof db.user.findMany>>;

export function OurBarbersSection(props: { barbers: UsersWithoutFilterOptions; signedOut: JSX.Element }) {
  const [query] = useQueryState("q", parseAsString);

  // If no barbers are available, use example ones
  const barbers = props.barbers.length
    ? props.barbers
    : [
        { username: "john_doe", name: "John Doe", id: "1", imageSrc: "/alex.jpg", isExample: true },
        { username: "jane_smith", name: "Jane Smith", id: "2", imageSrc: "/amira.jpg", isExample: true },
        { username: "mike_jones", name: "Mike Jones", id: "3", imageSrc: "/david.png", isExample: true },
      ];

  return (
    <Fragment>
      <div>
        <h1 className="text-5xl font-semibold pt-10 text-center">Our Barbers</h1>
        <p className="opacity-50 text-center text-md mt-2">Explore skilled barbers and book your next haircut with ease</p>
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
                  {barbers.map(({ username, name, id, imageSrc, isExample, costPerHairCut  }) => (
                    <OurBarbersCard
                      key={username}
                      slug={username}
                      userId={id}
                      title={name}
                      query={query ?? undefined}
                      imageSrc={imageSrc} // Pass image source if available
                      isExample={isExample} // Indicate if this is an example barber
                      costPerHairCut ={costPerHairCut } 
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

