import { AuthUserType } from "@/types";
import Image from "next/image";

function DashboardUserIcon({
  user,
  className,
}: {
  user: AuthUserType;
  className?: string;
}) {
  const profileImage =
    user.image ||
    `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=${
      user.name.split(" ")[0]
    }+${user.name.split(" ")[1]}`;
  return (
    <Image
      src={profileImage}
      alt={`Profile picture of ${user.name}`}
      width={40}
      height={40}
      priority
      className={`size-10 shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
export default DashboardUserIcon;
