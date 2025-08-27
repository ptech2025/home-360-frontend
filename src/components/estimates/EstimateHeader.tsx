import { Estimate, EstimateStatus } from "@/types/estimate";
import { Button } from "../ui/button";
import { formatEstimateId } from "@/utils/funcs";
import SavedToProjectDialog from "./SavedToProjectDialog";

type Props = {
  estimate: Estimate;
};

function EstimateHeader({ estimate }: Props) {
  const { id, status, title, projectId } = estimate;
  return (
    <div className="flex justify-between items-center gap-4 pr-4 pb-4">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-sm text-dark-orange">{formatEstimateId(id)}</span>
        <h4 className="text-main-blue text-base lg:text-lg font-semibold">
          {title}
        </h4>
      </div>
    <SavedToProjectDialog />
    </div>
  );
}
export default EstimateHeader;
