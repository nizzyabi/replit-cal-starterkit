import GettingStarted from "../_components/getting-started-steps";
import { auth } from "@/auth";
import { db } from "prisma/client";

export default async function Dashboard() {
  const sesh = await auth();
  

  if (!sesh?.user?.id) {
    return <div>Not logged in</div>;
  }

  return <GettingStarted userId={sesh.user.id}   />;
}
