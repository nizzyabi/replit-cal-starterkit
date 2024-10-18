import SupabaseReactDropzone from "../settings/_components/supabase-react-dropzone";
import { expertEdit } from "@/app/_actions";
import { ButtonSubmit } from "@/app/_components/submit-button";
import { Label } from "@/components/ui/label";
import { useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useState } from "react";
import SupabaseHaircutDropzone from "../settings/_components/supabase-haircut-dropzone";
import { Input } from "@/components/ui/input";

type UserDetailsFormState = { error: null | string } | { success: null | string };

const UserDetailsStep = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const [userDetailsFormState, dispatch] = useFormState<UserDetailsFormState, FormData>(expertEdit, {
    error: null,
  });

  const { isDisabledStep, prevStep } = useStepper();

  const [uploadedHaircutImages, setUploadedHaircutImages] = useState<File[]>([]);

  const handleHaircutImagesUploaded = (files: File[]) => {
    setUploadedHaircutImages((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    if ("success" in userDetailsFormState && userDetailsFormState?.success) {
      router.push("/dashboard");
    }
  }, [userDetailsFormState]);

  return (
    <form className="mt-10" action={dispatch}>
      <h1 className="text-2xl font-display font-bold text-center mb-3">Your Profile</h1>
      <SupabaseReactDropzone userId={userId ?? "clxj4quka0000gebuthdxi1cp"} />
      <div className="mt-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none mt-1"
          id="bio"
          name="bio"
          maxLength={500}
        />
      </div>
      <div className="mt-2">
        <Label htmlFor="pricePerHairCut">Price per haircut</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            $
          </span>
          <Input
            placeholder="20"
            className="pl-8 resize-none"
            id="pricePerHairCut"
            name="pricePerHairCut"
            type="number"
            min={1}  
            step="1"  
          />
        </div>
      </div>
      <div className="mt-2">
        <Label htmlFor="haircutImages">Your Haircuts</Label>
        <SupabaseHaircutDropzone 
          userId={userId ?? "clxj4quka0000gebuthdxi1cp"} 
        />
        {uploadedHaircutImages.length > 0 && (
          <div className="mt-1">
            <p>Uploaded haircut images:</p>
            <ul className="list-disc pl-5">
              {uploadedHaircutImages.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center w-full gap-2">
        
        <ButtonSubmit variant="default" size="sm">
          Finish Profile
        </ButtonSubmit>
      </div>
    </form>
  );
};

export default UserDetailsStep;
