"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchEstimateById } from "@/services/estimate";
import { useQuery } from "@tanstack/react-query";

import {
  DisplayEstimatePageTotal,
  DisplayEstimatePageHeader,
  DisplayEstimatePageLineItems,
} from "./DisplayEstimateComps";
import { Tabs, TabsContent } from "../ui/tabs";
import EstimatePreview from "./EstimatePreview";
import { useEstimatePanelStore } from "@/store/estimateStore";
import { ProfileType } from "@/types";

type Props = {
  estimateId: string;
  profile: ProfileType;
  userEmail: string;
};

function SingleEstimateWrapper({ estimateId, profile, userEmail }: Props) {
  const { replace } = useRouter();
  const { estimateMode, setEstimateMode } = useEstimatePanelStore();
  const { data, isLoading } = useQuery({
    queryKey: ["estimate", estimateId],
    queryFn: () => fetchEstimateById(estimateId),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    toast.error("Project Not Found");
    replace("/dashboard/projects");
    return null;
  }

  return (
    <Tabs
      value={estimateMode}
      onValueChange={(val) => setEstimateMode(val as "edit" | "preview")}
      className="w-full"
    >
      <TabsContent value={"edit"}>
        <div className="bg-sidebar overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 p-4 pr-0  rounded-lg  shadow-sm border border-sidebar-border h-full">
          <DisplayEstimatePageHeader estimate={data} />
          <DisplayEstimatePageLineItems
            lineItems={data.lineItems}
            projectId={data.projectId}
          />
          <DisplayEstimatePageTotal estimate={data} />
        </div>
      </TabsContent>
      <TabsContent value="preview">
        <EstimatePreview
          estimate={data}
          profile={profile}
          userEmail={userEmail}
        />
      </TabsContent>
    </Tabs>
  );
}
export default SingleEstimateWrapper;
