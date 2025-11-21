"use client";

import { AuthUserType } from "@/types";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { applianceMutations, applianceQueries } from "@/queries/appliance";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ApplianceEmpty from "./ApplianceEmpty";
import { canAddAppliance } from "@/utils/funcs";

type SuggestedGridWrapperProps = {
  homeId: string;
  user: AuthUserType | null;
};

function SuggestedGridWrapper({ homeId, user }: SuggestedGridWrapperProps) {
  // Fetch suggested appliances if not provided as prop
  const { data: suggestedData, isLoading } = useQuery(
    applianceQueries.suggestedAppliances(homeId)
  );
  const { data } = useQuery(applianceQueries.applianceMetrics(homeId));
  const hasAddAppliancePermission = canAddAppliance(user, data?.applianceUsage);

  const appliances = suggestedData || [];

  const { mutate: addAppliance, isPending } = useMutation({
    mutationFn: applianceMutations.addSuggestedAppliance,
    onSuccess: () => {
      toast.success("Appliance added successfully.");
      // Invalidate queries to refresh the data
    },
    onSettled(_data, _error, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({
        queryKey: ["suggested-appliances", homeId],
      });
      context.client.invalidateQueries({
        queryKey: ["all-appliances", homeId],
      });
      context.client.invalidateQueries({
        queryKey: ["appliance-metrics", homeId],
      });
    },
  });

  const handleAddAppliance = (applianceId: string) => {
    addAppliance({ homeId, applianceId });
  };

  if (isLoading) {
    return (
      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl w-full flex justify-between flex-col gap-3 p-4 bg-white border border-lighter-gray animate-pulse"
          >
            <div className="bg-lighter-gray/50 rounded-md min-h-[160px] w-full" />
            <div className="flex flex-col gap-2">
              <div className="h-6 bg-lighter-gray/50 rounded w-3/4" />
              <div className="h-4 bg-lighter-gray/50 rounded w-1/2" />
            </div>
            <div className="h-10 bg-lighter-gray/50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (appliances.length === 0) {
    return <ApplianceEmpty />;
  }

  return (
    <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      {appliances.map((appliance) => (
        <div
          key={appliance.id}
          className="rounded-xl w-full flex justify-between flex-col gap-3 p-4 bg-white border border-lighter-gray"
        >
          <div className="bg-lighter-gray/50 rounded-md min-h-[160px] w-full flex items-center justify-center">
            {/* You can add an icon or image here if available */}
            <div className="text-gray text-sm">No image</div>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-black text-xl font-circular-bold">
              {appliance.name}
            </h5>
            <span className="text-sm capitalize text-gray">
              {appliance.category?.replace("_", " ") ||
                appliance.applianceCategory?.replace("_", " ") ||
                "Other"}
            </span>
          </div>

          <Button
            onClick={() => handleAddAppliance(appliance.id)}
            disabled={appliance.selected || isPending || !hasAddAppliancePermission.allowed}
            className="green-btn w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : appliance.selected ? (
              <span>Already Added</span>
            ) : (
              <>
                <Plus className="size-4" />
                <span>Add Appliance</span>
              </>
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default SuggestedGridWrapper;
