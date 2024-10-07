"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function UserAvatar({ userId }: { userId: string }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setAvatarUrl(`avatars/${userId}`);
  }, [userId]);

  if (!avatarUrl) {
    return <User className="h-5 w-5" />;
  }

  return (
    <Image
      alt="User avatar"
      className="h-12 w-12 rounded-full object-cover"
      src={avatarUrl}
      height={20}
      width={20}
      onError={() => setAvatarUrl(null)}
    />
  );
}