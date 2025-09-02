import { Estimate } from "@/types/estimate";
import { EstimateAction } from "./EstimateDropdownMenus";
import { Button } from "../ui/button";
import { EstimatePreviewLineItems } from "./DisplayEstimateComps";
import { formatCurrency, formatEstimateId } from "@/utils/funcs";
import { format } from "date-fns";
import { ProfileType } from "@/types";
import Image from "next/image";
import { shareEstimateToClient } from "@/services/estimate";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useEstimatePanelStore } from "@/store/estimateStore";

type EstimatePreviewProps = {
  estimate: Estimate;
  profile: ProfileType;
  userEmail: string;
};
function EstimatePreview({
  estimate,
  profile,
  userEmail,
}: EstimatePreviewProps) {
  const { setEstimateMode } = useEstimatePanelStore();
  const { projectId, id, totalAmount, project } = estimate;
  const { companyLogo, companyName } = profile;
  const { client } = project;
  const defaultImage = companyLogo
    ? companyLogo
    : `https://ui-avatars.com/api/?size=60&background=d1d6dc&color=000&rounded=true&name=${companyName}`;

  const { mutate, isPending } = useMutation({
    mutationFn: (projId: string) => {
      return shareEstimateToClient(projId, id);
    },

    onSuccess() {
      toast.success("Estimate sent successfully.");
      setEstimateMode("edit");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <div className="bg-sidebar grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-0 p-4   rounded-lg  shadow-sm border border-sidebar-border min-h-dvh">
      <div className="flex justify-between items-center gap-4  pb-4">
        <h4 className="text-main-blue/80 text-base md:text-lg lg:text-xl font-bold">
          Estimate Preview
        </h4>

        {projectId && (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => mutate(projectId)}
              disabled={isPending}
              className="h-10 text-white bg-dark-orange rounded-4xl w-max hover:bg-dark-orange/10 hover:text-dark-orange border hover:border-dark-orange border-transparent"
            >
              {isPending ? <span>Sending...</span> : <span>Send Now</span>}
            </Button>
            <EstimateAction estimate={estimate} />
          </div>
        )}
      </div>
      <div className="p-2 md:p-4 grid-cols-2 grid gap-4 bg-main-blue/5 rounded-md">
        <div className="flex flex-col gap-4 justify-between items-start">
          <Image
            alt={companyName}
            src={defaultImage}
            height={45}
            width={45}
            className="rounded-md size-[45px] object-cover object-center"
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-main-blue/80">Sent To:</span>
              {client && (
                <span className="text-main-blue text-sm font-bold">
                  {client.name}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              {client && client.address && (
                <span className="text-sm text-main-blue/80">
                  {client.address}
                </span>
              )}{" "}
              {client && client.phone && (
                <span className="text-sm text-main-blue/80">
                  {client.phone}
                </span>
              )}
              {client && client.email && (
                <span className="text-sm text-dark-orange">{client.email}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-main-blue">Estimate</h1>
          <div className="text-sm text-main-blue/80 flex gap-1">
            <span>Estimate No:</span>
            <span className="font-bold text-main-blue">
              {formatEstimateId(id)}
            </span>
          </div>{" "}
          <div className="text-sm text-main-blue/80 flex gap-1">
            <span>Date:</span>
            <span className="font-bold text-main-blue">
              {format(new Date(), "MM/dd/yyyy")}
            </span>
          </div>{" "}
          <div className="text-sm text-main-blue/80 flex flex-col gap-1">
            <span>Total Due:</span>
            <span className="font-bold text-main-blue">
              USD: {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <EstimatePreviewLineItems estimate={estimate} />

      <div className="p-2 md:p-4 flex flex-col  gap-4">
        <Image
          alt={companyName}
          src={defaultImage}
          height={45}
          width={45}
          className="rounded-md size-[45px] object-cover object-center"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-main-blue font-bold">{companyName}</h2>
          <div className="flex flex-col gap-0.5">
            {profile.location && (
              <span className="text-sm text-main-blue/80">
                {profile.location}
              </span>
            )}{" "}
            {profile.phoneNumber && (
              <span className="text-sm text-main-blue/80">
                {profile.phoneNumber}
              </span>
            )}{" "}
            <span className="text-sm text-dark-orange">{userEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EstimatePreview;
