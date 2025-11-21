import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Route } from "next";

type UpgradePromptProps = {
  reason?: string;
  upgradeMessage?: string;
  className?: string;
  upgradeUrl?: string;
};

function UpgradePrompt({
  reason,
  upgradeMessage,
  className,
  upgradeUrl = "/pricing",
}: UpgradePromptProps) {
  if (!reason && !upgradeMessage) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute shadow-md flex flex-col gap-2 top-12 right-0 z-10 p-4 rounded-md bg-white",
        className
      )}
    >
      <div className="flex font-semibold text-black flex-col justify-center items-center gap-2">
        <Lock className="size-6 text-black" />
        {reason && <span className="text-center">{reason}</span>}
      </div>
      {upgradeMessage && (
        <p className="text-center text-base">{upgradeMessage}</p>
      )}

      <Button asChild className="green-btn w-max ml-auto">
        <Link href={upgradeUrl as Route}>Upgrade</Link>
      </Button>
    </div>
  );
}

export default UpgradePrompt;
