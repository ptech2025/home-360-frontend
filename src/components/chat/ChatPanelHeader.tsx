import { Button } from "../ui/button";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import HideChatPanelBtn from "./HideChatPanelBtn";
import { useChatPanelStore } from "@/store/chatPanelStore";
import { MyUIMessage } from "@/types/message-schema";
import { getChatHeading } from "@/utils/funcs";

type Props = {
  firstMessage: MyUIMessage | null;
};

function ChatPanelHeader({ firstMessage }: Props) {
  const { setIsSessionsPanelOpen, isSessionsPanelOpen } = useChatPanelStore();
  const heading = getChatHeading(firstMessage, true);
  return (
    <div className="flex items-center  pr-4 pb-4 bg-white justify-between gap-4">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setIsSessionsPanelOpen(!isSessionsPanelOpen)}
        className="shrink-0 bg-transparent border border-sidebar-border text-main-blue"
      >
        <HiOutlineMenuAlt2 className="size-5" />
      </Button>
      <h3 className="text-sm truncate font-medium">{heading}</h3>
      <HideChatPanelBtn />
    </div>
  );
}
export default ChatPanelHeader;
