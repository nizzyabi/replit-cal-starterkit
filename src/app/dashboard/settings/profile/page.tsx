import ExpertEditForm from "../_components/expert-edit";
import SupabaseHaircutDropzone from "../_components/supabase-haircut-dropzone";
import SupabaseReactDropzone from "../_components/supabase-react-dropzone";
import { currentUser } from "@/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardSettingsProfile() {
  const expert = await currentUser();
  if (!expert) {
    return <div>Not logged in</div>;
  }
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>Used on your public profile, once it is approved.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertEditForm id="name" name="name" placeholder={expert.name ?? "Your name"} />
          </CardContent>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
            <CardDescription>
              A couple of sentences about yourself. This will be displayed on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertEditForm id="bio" name="bio" placeholder={expert.bio ?? "Your Bio"} />
          </CardContent>
          <CardHeader>
            <CardTitle>Cost per cut</CardTitle>
            <CardDescription>
              Cost per haircut. This will be displayed on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertEditForm id="costPerHairCut" name="costPerHairCut" placeholder={expert.costPerHairCut ?? "Cost per cut"} />
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Image</CardTitle>
            <CardDescription>Used on your public profile, once it is approved.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <SupabaseReactDropzone userId={expert.id} />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-6">
            <CardDescription className="flex items-center gap-1">
              <Info className="size-3.5" />
              The Image upload auto-saves.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Hair cuts</CardTitle>
          <CardDescription>Used to show off your haircuts on previous clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SupabaseHaircutDropzone userId={expert.id} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-6">
          <CardDescription className="flex items-center gap-1">
            <Info className="size-3.5" />
            The Image upload auto-saves.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
