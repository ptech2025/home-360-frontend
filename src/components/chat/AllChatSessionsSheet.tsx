"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useChatPanelStore } from "@/store/chatPanelStore";
import { ChatSession } from "@/types/chat";
import { getChatHeading } from "@/utils/funcs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { PiTrash } from "react-icons/pi";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import Link from "next/link";

type Props = {
  sessions: ChatSession[];
};

function AllChatSessionsSheet({ sessions }: Props) {
  const params = useParams();
  const sessionId = params.sessionId;
  const { isSessionsPanelOpen, setIsSessionsPanelOpen } = useChatPanelStore();

  return (
    <Sheet open={isSessionsPanelOpen} onOpenChange={setIsSessionsPanelOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chats</SheetTitle>
        </SheetHeader>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {sessions.map((session) => {
                const firstMessage = session.messages[0];
                const heading = getChatHeading(firstMessage, false);
                return (
                  <CommandItem
                    key={session.id}
                    value={heading}
                    data-state={
                      session.id === sessionId ? "active" : "inactive"
                    }
                    className="h-20 text-main-blue data-[state=active]:text-accent-foreground hover:bg-accent cursor-pointer flex items-center justify-between gap-4 data-[state=active]:bg-main-blue/20"
                  >
                    <Link
                      href={`/dashboard/c/${session.id}`}
                      onClick={() => {
                        setIsSessionsPanelOpen(false);
                      }}
                      className="min-w-0 h-full flex-1 flex flex-col gap-1.5 justify-center items-start"
                    >
                      <span className="text-sm text-start w-full truncate">
                        {heading}
                      </span>
                      <span className="text-xs">
                        {format(new Date(session.createdAt), "MMM dd, yyyy")}
                      </span>
                    </Link>
                    <Dialog>
                      <DialogTrigger className="shrink-0 size-10 rounded-full flex items-center justify-center  hover:bg-destructive/10 ">
                        <PiTrash className="size-5 text-destructive" />
                      </DialogTrigger>
                      <DialogContent></DialogContent>
                    </Dialog>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  );
}
export default AllChatSessionsSheet;
