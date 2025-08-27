"use client";

import ChatPanel from "@/components/chat/ChatPanel";
import DisplayEstimate from "@/components/estimates/DisplayEstimate";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useIsTablet } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useChatPanelStore } from "@/store/chatPanelStore";

type Props = {
  sessionId: string;
  estimateId?: string;
};

function ChatWrapper({ sessionId, estimateId }: Props) {
  const { isChatPanelOpen, setIsChatPanelOpen } = useChatPanelStore();
  const isTablet = useIsTablet();

  return (
    <div
      className={cn(
        "grid   w-full gap-4 overflow-y-hidden flex-1 justify-between items-start ",
        isChatPanelOpen
          ? "grid-cols-1 lg:grid-cols-[0.75fr_1fr]"
          : "grid-cols-1"
      )}
    >
      <Collapsible
        open={isTablet ? true : isChatPanelOpen}
        onOpenChange={setIsChatPanelOpen}
        className="h-full relative data-[state=closed]:hidden"
      >
        <CollapsibleContent className="h-full absolute left-0 top-0 pb-1">
          <ChatPanel sessionId={sessionId} />
        </CollapsibleContent>
      </Collapsible>
      <div className="hidden lg:block h-full pb-1 transition-width duration-300 ease-in-out">
        <DisplayEstimate estimateId={estimateId} />
      </div>
    </div>
  );
}
export default ChatWrapper;
