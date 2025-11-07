import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { WarrantyStatus } from "@/types";

type DisplayWarrantyStatusProps = {
  status: WarrantyStatus;
  className?: string;
};

const warrantyStatusStyles: Record<WarrantyStatus, string> = {
  "Under Warranty": "bg-main-green/10 text-main-green border-main-green/20",
  "Expiring Soon": "bg-main-yellow/10 text-main-yellow border-main-yellow/20",
  Expired: "bg-red-100 text-red-800 border-red-200",
  "No Warranty": "bg-gray-100 text-gray-800 border-gray-200",
};

function DisplayWarrantyStatus({
  status,
  className,
}: DisplayWarrantyStatusProps) {
  return (
    <Badge
      className={cn(
        "capitalize font-medium font-circular-medium",
        warrantyStatusStyles[status],
        className
      )}
    >
      {status}
    </Badge>
  );
}

export default DisplayWarrantyStatus;
