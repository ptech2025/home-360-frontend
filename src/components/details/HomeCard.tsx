import { Home } from "@/types/prisma-schema-types";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
type Props = {
  home: Home;
  currentHomeId: string;
};
function HomeCard({ home, currentHomeId }: Props) {
  const isCurrentHome = home.id === currentHomeId;
  return (
    <div className="w-full flex flex-col gap-2 rounded-xl border border-lighter-gray p-4  relative">
      {!home.active && (
        <div className="absolute rounded-md inset-0 bg-black/80 z-20 flex items-center justify-center size-full">
          <Lock className="size-10 text-white" />
        </div>
      )}
      <div className="flex relative min-h-[200px] items-center gap-2 justify-center bg-lighter-gray/50 p-2 rounded-md">
        {isCurrentHome && (
          <div className="absolute px-2 py-1 text-xs top-2 right-2 bg-main-green text-white rounded-md z-10">
            <span>Current Home Active</span>
          </div>
        )}
        {home.photoUrl && (
          <Image
            src={home.photoUrl}
            alt={home.address || ""}
            fill
            priority
            className="size-fill object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <h6 className="text-black line-clamp-2  font-circular-bold text-base font-bold">
          {home.address}
        </h6>
        <Badge variant="outline" className="capitalize">
          {home.homeType.replace("_", " ")}
        </Badge>

        <Button
          disabled={!home.active}
          className={cn(
            "w-full",
            isCurrentHome ? "light-green-btn" : "green-btn"
          )}
          asChild
        >
          <Link href={`/dashboard/${home.id}`}>
            {isCurrentHome ? "Current Home" : "Switch to This Home"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
export default HomeCard;
