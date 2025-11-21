import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ListChecks, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { AddOrEditCustomTaskDialog } from "./TaskDialogs";
import { Button } from "../ui/button";
import UpgradePrompt from "../global/UpgradePrompt";
import { PermissionResult } from "@/utils/funcs";

function TasksEmpty({
  isCustom = false,
  hasCreateTaskPermission,
}: {
  isCustom?: boolean;
  hasCreateTaskPermission: PermissionResult;
}) {
  const { homeId } = useParams<{ homeId: string }>();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-lighter-gray text-main-green">
          <ListChecks />
        </EmptyMedia>
        <EmptyTitle className="font-circular-bold capitalize text-black font-bold">
          No {isCustom ? "Custom" : "Default"} Tasks Found
        </EmptyTitle>
        <EmptyDescription className="text-light-gray">
          {isCustom
            ? "Add your first custom task."
            : "No default tasks found for this home."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {hasCreateTaskPermission.allowed ? (
          <AddOrEditCustomTaskDialog type="create" homeId={homeId}>
            <Button className="h-8  flex items-center gap-2  py-2 px-3 rounded-md text-white font-medium text-base bg-main-green hover:bg-white hover:border-main-green hover:text-main-green border border-transparent transition-colors">
              <Plus className="size-4" />
              <span>Add Custom Task</span>
            </Button>
          </AddOrEditCustomTaskDialog>
        ) : (
          <UpgradePrompt
            reason={hasCreateTaskPermission.reason}
            upgradeMessage={hasCreateTaskPermission.upgradeMessage}
          />
        )}
      </EmptyContent>
    </Empty>
  );
}
export default TasksEmpty;
