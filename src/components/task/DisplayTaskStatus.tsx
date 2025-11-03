import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ReminderStatus } from "@/types/prisma-schema-types";

type Props = { status: ReminderStatus };
export const renderTaskStatusStyle = (status: ReminderStatus) => {
  switch (status) {
    case ReminderStatus.completed:
      return "bg-green-100 text-green-700"; // success - task Completed

    case ReminderStatus.in_progress:
      return "bg-blue-100 text-blue-700"; // active - work in progress

    case ReminderStatus.cancelled:
      return "bg-red-100 text-red-700"; // neutral - intentionally cancelled

    case ReminderStatus.overdue:
      return "bg-red-100 text-red-700"; // warning - needs attention

    case ReminderStatus.pending:
      return "bg-amber-100 text-amber-700"; // neutral - awaiting action

    default:
      throw new Error("Invalid Task Status");
  }
};

function DisplayTaskStatus({ status }: Props) {
  return (
    <Badge
      className={cn(
        "capitalize rounded-xl px-3  text-sm",
        renderTaskStatusStyle(status)
      )}
    >
      <span>{String(status).replace("_", " ")} </span>
    </Badge>
  );
}
export default DisplayTaskStatus;
