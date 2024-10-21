"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export default function SupabaseHaircutDropzone({ userId }: { userId: string }) {
  const [haircuts, setHaircuts] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  const supabaseBrowserClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    // Fetch existing haircut images for the barber
    const fetchHaircuts = async () => {
      const { data, error } = await supabaseBrowserClient.storage
        .from("haircuts")
        .list(`${userId}/`);

      if (data) {
        setHaircuts(data.map(file => `haircuts/${userId}/${file.name}`));
      } else if (error) {
        console.error("Error fetching haircuts:", error);
      }
    };

    fetchHaircuts().catch(error => {
      console.error("Error in fetchHaircuts:", error);
    });
  }, [userId, supabaseBrowserClient]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/avif": [],
    },
    onDropAccepted: async (acceptedFiles) => {
      setStatus("loading");

      try {
        for (const file of acceptedFiles) {
          const { data, error } = await supabaseBrowserClient.storage
            .from("haircuts")
            .upload(`${userId}/${file.name}`, file);

          if (data) {
            setHaircuts(prev => [...prev, `haircuts/${userId}/${file.name}`]);
          } else if (error) {
            console.error("Error uploading file:", error);
          }
        }
        setStatus("success");
      } catch (error) {
        console.error("Error in onDropAccepted:", error);
        setStatus("error");
      }
    },
  });

  // Delete handler to remove the image
  const handleDelete = async (fileName: string) => {
    const { error } = await supabaseBrowserClient.storage
      .from("haircuts")
      .remove([`${userId}/${fileName}`]);

    if (error) {
      console.error("Error deleting file:", error);
    } else {
      // Remove the deleted image from the state
      setHaircuts((prev) => prev.filter((image) => image !== `haircuts/${userId}/${fileName}`));
    }
  };

  return (
    <div className="mx-auto grid w-full gap-4">
      <div className="grid grid-cols-4 gap-2">
        {haircuts.map((haircut, index) => {
          const fileName = haircut.split("/").pop(); // Get the file name for deletion
          return (
            <div key={index} className="relative group">
              <Image
                alt={`Haircut ${index + 1}`}
                className="aspect-square rounded-md object-cover shadow-sm"
                src={haircut}
                height="200"
                width="200"
              />
              {/* Delete Button */}
              <button
                type="button"
                className="absolute top-2 right-24 bg-red-600 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(fileName!)}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
      <div
        {...getRootProps({
          className: cn(
            "dropzone border-dashed border px-3 py-8 rounded-md hover:border-foreground/40 cursor-pointer"
          ),
        })}>
        <input {...getInputProps()} />
        <p className="text-sm text-muted-foreground">Drop haircut images here, or click to select files</p>
      </div>
    </div>
  );
}
