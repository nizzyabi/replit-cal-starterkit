import { Navbar } from "@/components/navbar";
import { type ReactNode } from "react";

export default function BarberLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
