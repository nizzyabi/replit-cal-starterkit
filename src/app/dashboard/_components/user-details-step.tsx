import SupabaseReactDropzone from "../settings/_components/supabase-react-dropzone";
import { expertEdit } from "@/app/_actions";
import { ButtonSubmit } from "@/app/_components/submit-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useState } from "react";

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
      <SupabaseReactDropzone userId={userId ?? "clxj4quka0000gebuthdxi1cp"} />
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none"
          id="bio"
          name="bio"
          maxLength={500}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="haircutImages">Hair cuts</Label>
        <SupabaseReactDropzone 
          userId={userId ?? "clxj4quka0000gebuthdxi1cp"} 
          multiple={true}
          onUpload={handleHaircutImagesUploaded}
        />
        {uploadedHaircutImages.length > 0 && (
          <div className="mt-2">
            <p>Uploaded haircut images:</p>
            <ul className="list-disc pl-5">
              {uploadedHaircutImages.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
          Prev
        </Button>
        <ButtonSubmit variant="default" size="sm">
          Finish
        </ButtonSubmit>
      </div>
    </form>
  );
};

export default UserDetailsStep;
