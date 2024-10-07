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
      }
    };

    fetchHaircuts();
  }, [userId]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/avif": [],
    },
    onDropAccepted: async (acceptedFiles) => {
      setStatus("loading");

      for (const file of acceptedFiles) {
        const { data, error } = await supabaseBrowserClient.storage
          .from("haircuts")
          .upload(`${userId}/${file.name}`, file);

        if (data) {
          setHaircuts(prev => [...prev, `haircuts/${userId}/${file.name}`]);
        }
      }

      setStatus("success");
    },
  });

  return (
    <div className="mx-auto grid w-full gap-4">
      <div className="grid grid-cols-4 gap-2">
        {haircuts.map((haircut, index) => (
          <Image
            key={index}
            alt={`Haircut ${index + 1}`}
            className="aspect-square rounded-md object-cover border border-foreground/10 shadow-sm"
            src={haircut}
            height="200"
            width="200"
          />
        ))}
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