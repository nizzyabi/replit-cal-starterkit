import { type ReactNode } from "react";

export default function SignupLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
