"use client";

import { StarIcon } from "../global/Icons";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { createChatSessionServer } from "@/lib/actions";

function AskAIBtn() {
  const pathname = usePathname();
  const url = "/dashboard/c";
  const isActive = pathname === url || pathname.startsWith(`${url}/`);
  return (
    <SidebarMenuItem>
      <form action={createChatSessionServer}>
        <SidebarMenuButton
          isActive={isActive}
          tooltip={{
            children: "Ask AI",
          }}
          className={
            "group flex h-10 w-full [&>svg]:size-5   group-data-[collapsible=icon]:!pl-1.5   items-center gap-2 text-sm font-medium text-main-blue transition-all data-[active=true]:bg-dark-orange/20 "
          }
        >
          <StarIcon />
          <span>Ask AI</span>
        </SidebarMenuButton>
      </form>
    </SidebarMenuItem>
  );
}
export default AskAIBtn;
