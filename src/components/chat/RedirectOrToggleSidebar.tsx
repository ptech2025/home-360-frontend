import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { TooltipTrigger, Tooltip, TooltipContent } from "../ui/tooltip";

type Props = {
  url: string;
  showRedirect: boolean;
};
function RedirectOrToggleSidebar({ url, showRedirect }: Props) {
  return (
    <div className="flex items-center justify-start shrink-0">
      {showRedirect && (
        <Link
          href={url}
          className="hidden md:flex items-center justify-center size-10 p-1 gap-2 rounded-full hover:bg-main-blue/10 transition-colors duration-200 text-main-blue"
        >
          <ArrowLeft className="cursor-pointer size-6" />
        </Link>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger className="md:hidden size-8 [&>svg]:size-4.5!" />
        </TooltipTrigger>
        <TooltipContent side="right">Toggle Sidebar</TooltipContent>
      </Tooltip>
    </div>
  );
}
export default RedirectOrToggleSidebar;
