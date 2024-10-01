import { cn } from "@/lib/utils";
import Link from "next/link";

export const Logo = ({ href, className }: { href?: string; className?: string }) => {
  return (
    <Link href={href ?? "/"} className={cn("flex font-display text-2xl", className)}>
      <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      <span className="font-display text-sm">®</span>
    </Link>
  );
};
