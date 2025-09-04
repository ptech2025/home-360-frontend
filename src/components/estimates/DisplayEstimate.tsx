import { fetchEstimateById } from "@/services/estimate";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../ai-elements/loader";
import { useEffect } from "react";
import { toast } from "sonner";
import EstimateEmpty from "./EstimateEmpty";

import {
  DisplayEstimateHeader,
  DisplayEstimateLineItems,
  DisplayEstimateTotal,
} from "./DisplayEstimateComps";

type Props = {
  estimateId?: string;
};

function DisplayEstimate({ estimateId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["estimate", estimateId],
    queryFn: () => fetchEstimateById(estimateId),
  });

  useEffect(() => {
    if (error) {
      toast.error("Estimate not found");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="bg-sidebar flex justify-center items-center  p-4 rounded-lg  shadow-sm border border-sidebar-border h-full">
        <Loader />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="bg-sidebar flex items-center justify-center p-4 rounded-lg  shadow-sm border border-sidebar-border h-full">
        <EstimateEmpty />
      </div>
    );
  }

  return (
    <div className="bg-sidebar overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 p-4 pr-0  rounded-lg  border border-sidebar-border h-full">
      <DisplayEstimateHeader estimate={data} />
      <DisplayEstimateLineItems
        lineItems={data.lineItems}
        projectId={data.projectId}
        estimateId={data.id}
      />
      <DisplayEstimateTotal estimate={data} />
    </div>
  );
}
export default DisplayEstimate;
