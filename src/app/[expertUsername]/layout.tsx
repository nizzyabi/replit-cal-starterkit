import { Navbar } from "@/components/navbar";
import { Logo } from "../_components/universal/logo";
import { SignedIn, SignedOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

export default function ExpertLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
