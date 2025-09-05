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
import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";
import { SingleEstimateSkeleton } from "../global/Skeletons";
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
    return <SingleEstimateSkeleton />;
  }

  if (!data) {
    toast.error("Estimate Not Found");
    replace("/dashboard/projects");
    return null;
  }

  return (
    <section className="w-full h-full py-4  flex-col flex gap-4">
      <RedirectOrToggleSidebar
        url={
          data.projectId
            ? `/dashboard/projects/${data.projectId}`
            : `/dashboard/projects`
        }
        showRedirect={true}
      />{" "}
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
              estimateId={data.id}
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
    </section>
  );
}
export default SingleEstimateWrapper;
