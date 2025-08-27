import { ProjectStatus } from "@/types/project";
import {
  CircleDashed,
  CircleSlash,
  CircleStar,
  CircleCheck,
  CircleDot,
  CircleMinus,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
type Props = {
  status: ProjectStatus;
};

export const renderStatusIcon = (status: ProjectStatus) => {
  switch (String(status)) {
    case "draft":
      return <CircleDashed />;
    case "bidding":
      return <CircleSlash />;
    case "approved":
      return <CircleStar />;
    case "in_progress":
      return <CircleDot />;
    case "completed":
      return <CircleCheck />;
    case "archived":
      return <CircleMinus />;
    default:
      throw new Error("Invalid Project Status");
  }
};

export const renderStatusStyle = (status: ProjectStatus) => {
  switch (String(status)) {
    case "draft":
      return "bg-gray-100 text-gray-700"; // neutral gray

    case "bidding":
      return "bg-yellow-100 text-yellow-700"; // warning/attention

    case "approved":
      return "bg-blue-100 text-blue-700"; // info/positive action

    case "in_progress":
      return "bg-indigo-100 text-indigo-700"; // progress/work

    case "completed":
      return "bg-green-100 text-green-700"; // success/done

    case "archived":
      return "bg-red-100 text-red-700"; // archived/closed

    default:
      throw new Error("Invalid Project Status");
  }
};

function DisplayProjectStatus({ status }: Props) {
  return (
    <Badge className={cn("capitalize px-2", renderStatusStyle(status))}>
      {renderStatusIcon(status)}
      <span>{String(status).replace("_", " ")} </span>
    </Badge>
  );
}
export default DisplayProjectStatus;
