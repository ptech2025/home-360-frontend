import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useChatPanelStore } from "@/store/chatPanelStore";
import { useIsTablet } from "@/hooks/use-media-query";

export default function HideChatPanelBtn() {
  const { setIsChatPanelOpen } = useChatPanelStore();
  const isTablet = useIsTablet();

  const handleHideChatPanel = () => {
    if (isTablet) {
      return;
    }
    setIsChatPanelOpen(false);
  };
  return (
    <Button
      variant={"ghost"}
      onClick={handleHideChatPanel}
      size={"icon"}
      className="shrink-0 lg:flex hidden bg-transparent  text-main-blue"
    >
      <X className="size-5" />
    </Button>
  );
}
