"use client";

import { StarIcon } from "../global/Icons";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "@/services/chat-session";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
function AskAIBtn() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const url = "/dashboard/c";
  const isActive = pathname === url || pathname.startsWith(`${url}/`);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createSession();
    },
    onSuccess(id) {
      replace(`/dashboard/c/${id}`);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        disabled={isPending}
        onClick={() => mutate()}
        isActive={isActive}
        tooltip={{
          children: "Ask AI",
        }}
        className={
          "group flex h-10 w-full [&>svg]:size-5   group-data-[collapsible=icon]:!pl-1.5   items-center gap-2 text-sm font-medium text-main-blue transition-all data-[active=true]:bg-dark-orange/20 "
        }
      >
        <StarIcon className="text-dark-orange" />
        <span>Ask AI</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default AskAIBtn;
