import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { WarrantyStatus } from "@/types";

type MaintenanceType = "Maintenance" | "Installation" | "Purchase" | "Warranty";

type StatusType = WarrantyStatus | MaintenanceType;

type DisplayWarrantyStatusProps = {
  status: StatusType;
  className?: string;
};

const warrantyStatusStyles: Record<WarrantyStatus, string> = {
  "Under Warranty": "bg-main-green/10 text-main-green border-main-green/20",
  "Expiring Soon": "bg-main-yellow/10 text-main-yellow border-main-yellow/20",
  Expired: "bg-red-100 text-red-800 border-red-200",
  "No Warranty": "bg-gray-100 text-gray-800 border-gray-200",
};

const maintenanceTypeStyles: Record<MaintenanceType, string> = {
  Maintenance: "bg-blue-100 text-blue-800 border-blue-200",
  Installation: "bg-purple-100 text-purple-800 border-purple-200",
  Purchase: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Warranty: "bg-main-green/10 text-main-green border-main-green/20",
};

const allStatusStyles: Record<StatusType, string> = {
  ...warrantyStatusStyles,
  ...maintenanceTypeStyles,
};

function DisplayWarrantyStatus({
  status,
  className,
}: DisplayWarrantyStatusProps) {
  return (
    <Badge
      className={cn(
        "capitalize font-medium font-circular-medium",
        allStatusStyles[status],
        className
      )}
    >
      {status}
    </Badge>
  );
}

export default DisplayWarrantyStatus;
