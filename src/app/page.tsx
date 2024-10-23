"use client";

import { Haircuts } from "@/components/haircuts";
import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { Navbar } from "@/components/navbar";
import { OurBarbersLanding } from "@/components/our-barbers-landing";
import { Location } from "@/components/location";
import React from "react";

export default function Home() {

  return (
    <React.Fragment>
      <div>
        <Navbar />
        <Hero />
      </div>
      <main className="mt-40 space-y-40">
        <OurBarbersLanding />
        <Haircuts />
        <Testimonials />
        <Location />
      </main>
    </React.Fragment>
  );
}
