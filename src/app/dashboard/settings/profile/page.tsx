import BarberEditForm from "../_components/barber-edit";
import SupabaseHaircutDropzone from "../_components/supabase-haircut-dropzone";
import SupabaseReactDropzone from "../_components/supabase-react-dropzone";
import { currentUser } from "@/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardSettingsProfile() {
  const barber = await currentUser();
  if (!barber) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      <div className="space-y-6  py-8 bg-[#151518]">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Info Card */}
          <Card className="shadow-md rounded-lg overflow-hidden bg-[#010101]">
            <CardHeader className="p-6">
              <CardTitle className="text-xl text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Name</h3>
                <BarberEditForm id="name" name="name" placeholder={barber.name ?? "Your name"} />
              </div>
              {/* Bio Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Bio</h3>
                <BarberEditForm id="bio" name="bio" placeholder={barber.bio ?? "Your Bio"} />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Cost per haircut</h3>
                <BarberEditForm id="costPerHairCut" name="costPerHairCut" placeholder={barber.costPerHairCut ?? "Cost per haircut"} />
              </div>
            </CardContent>
          </Card>

          {/* Profile Image Card */}
          <Card className="shadow-md rounded-lg overflow-hidden bg-[#010101]">
            <CardHeader className="p-6">
              <CardTitle className="text-xl text-white">Profile Image</CardTitle>
              <CardDescription className="text-sm opacity-50">
                Used on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupabaseReactDropzone userId={barber.id} />
            </CardContent>
            <CardFooter className="border-t px-6 py-6 text-gray-400">
              <CardDescription className="flex items-center gap-1">
                <Info className="size-3.5" />
                The image upload auto-saves.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>

        {/* Haircuts Card */}
        <Card className="shadow-md rounded-lg overflow-hidden bg-[#010101]">
          <CardHeader className="p-6">
            <CardTitle className="text-xl text-white">Haircuts</CardTitle>
            <CardDescription className="text-sm opacity-50">
              Show off your haircuts done on previous clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SupabaseHaircutDropzone userId={barber.id} />
          </CardContent>
          <CardFooter className="border-t px-6 py-6 text-gray-400">
            <CardDescription className="flex items-center gap-1">
              <Info className="size-3.5" />
              The image upload auto-saves.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
