import { UserAvatar } from "./user-avatar";
import { ButtonSubmit } from "@/app/_components/submit-button";
import { SignedIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bolt, Home, PanelLeft, Settings, User } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

export default async function Layout({
  children,
  breadcrumbs,
  dashboardNavigationDesktop,
  dashboardNavigationMobile,
}: {
  children: ReactNode;
  breadcrumbs: ReactNode;
  dashboardNavigationDesktop: ReactNode;
  dashboardNavigationMobile: ReactNode;
}) {
  return (
    <SignedIn>
      {({ user }) => (
        <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr] 2xl:grid-cols-[280px_1fr]">
          <div className="hidden border-r  md:block">
            <div className="sticky top-0 z-40 flex h-full max-h-screen flex-col gap-2">
              <Link href='/our-barbers' className="flex h-14 items-center text-xl font-bold px-4 lg:h-[60px] lg:px-6">
                Cal's Barbershop
              </Link>
              <div className="flex-1">{dashboardNavigationDesktop}</div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/40 px-4 backdrop-blur-[2px] lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  {dashboardNavigationMobile}
                </SheetContent>
              </Sheet>
            
              <div className="relative ml-auto flex-1 md:grow-0">
                <div className="flex flex-row items-center justify-end gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="overflow-hidden rounded-full">
                          {user?.id ? <UserAvatar userId={user.id} /> : <User className="h-5 w-5" />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href="/our-barbers" className="flex items-center justify-center gap-1">
                            <Home className="size-4" />
                            Home
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/dashboard" className="flex items-center justify-center gap-1">
                            <Bolt className="size-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/dashboard/settings" className="flex items-center justify-center gap-1">
                            <Settings className="size-4" />
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>
                          <form
                            action={async () => {
                              "use server";
                              await signOut({ redirectTo: "/" });
                            }}>
                            <ButtonSubmit className="w-full">Logout</ButtonSubmit>
                          </form>
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </header>
            {children}
          </div>
        </div>
      )}
    </SignedIn>
  );
}
