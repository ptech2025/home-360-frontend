import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

import { AuthUserType } from "@/types";
import Image from "next/image";

function DashboardUserIcon({ user }: { user: AuthUserType }) {
  const userName = user.name || "User";
  const profileImage =
    user.image ||
    `https://ui-avatars.com/api/?size=60&background=112358&color=fff&rounded=true&name=${
      user.name.split(" ")[0]
    }+${user.name.split(" ")[1]}`;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={
          "group flex h-10 w-full [&>svg]:size-5   group-data-[collapsible=icon]:!p-0   items-center gap-2 text-sm font-medium  transition-all "
        }
      >
        <Image
          src={profileImage}
          alt={`Profile picture of ${userName}`}
          width={28}
          height={28}
          priority
          className="w-8 h-8 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col overflow-hidden flex-1 ">
          <span className="font-medium truncate text-main-blue text-sm font-broke-medium">
            {userName}
          </span>
          <span className="text-xs text-main-blue/80 truncate font-dm">
            {user.email}
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default DashboardUserIcon;
