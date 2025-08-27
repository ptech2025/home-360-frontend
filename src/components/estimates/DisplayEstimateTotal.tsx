import { Estimate } from "@/types/estimate";
import { formatCurrency } from "@/utils/funcs";

type Props = {
  estimate: Estimate;
};

function DisplayEstimateTotal({ estimate }: Props) {
  return (
    <div className="pr-4 py-4 flex justify-between items-center">
      <span className="text-dark-orange text-sm">Total Including Markup</span>
      <span className="text-lg md:text-xl lg:text-2xl font-bold text-dark-orange shrink-0">
        {formatCurrency(estimate.totalAmount)}
      </span>
    </div>
  );
}
export default DisplayEstimateTotal;
