"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

function UserIcon() {
  const { data } = authClient.useSession();
  const userName = data?.user?.name || "User";
  const profileImage = data?.user?.image;
  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt={`Profile picture of ${userName}`}
        width={28}
        height={28}
        priority
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
      <span className="text-sm font-semibold">
        {userName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase())
          .join("")
          .slice(0, 2)}
      </span>
    </div>
  );
}
export default UserIcon;
