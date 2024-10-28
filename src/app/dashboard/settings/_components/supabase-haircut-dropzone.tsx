"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function SupabaseHaircutDropzone({ userId }: { userId: string }) {
  const [haircuts, setHaircuts] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const supabaseBrowserClient = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
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

  const handleDelete = async (fileName: string) => {
    const { error } = await supabaseBrowserClient.storage
      .from("haircuts")
      .remove([`${userId}/${fileName}`]);
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      setHaircuts((prev) => prev.filter((image) => image !== `haircuts/${userId}/${fileName}`));
    }
  };

  return (
    <div className="mx-auto w-full space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {haircuts.map((haircut, index) => {
          const fileName = haircut.split("/").pop();
          return (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
              <div className="relative h-full w-full">
                <Image
                  alt={`Haircut ${index + 1}`}
                  src={haircut}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleDelete(fileName!)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white shadow-lg transition-transform hover:bg-red-700 hover:scale-110"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
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