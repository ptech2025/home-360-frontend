import { EstimateStatus } from "@/types/estimate";
import { Button } from "../ui/button";
import { formatEstimateId } from "@/utils/funcs";

type Props = {
  status: EstimateStatus;
  projectId: string | null;
  estimateId: string;
  estimateTitle: string;
};

function EstimateHeader({ estimateId, estimateTitle }: Props) {
  return (
    <div className="flex justify-between items-center gap-4 pr-4 pb-4">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-sm text-dark-orange">
          {formatEstimateId(estimateId)}
        </span>
        <h4 className="text-main-blue text-base lg:text-lg font-semibold">
          {estimateTitle}
        </h4>
      </div>
      <Button className="h-10 bg-dark-orange hover:bg-dark-orange/10 hover:text-dark-orange border hover:border-dark-orange border-transparent">
        Add to Project
      </Button>
    </div>
  );
}
export default EstimateHeader;
