import { FileText, Plus } from "lucide-react";
import { applianceQueries } from "@/queries/appliance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/funcs";
import DisplayWarrantyStatus from "./DisplayWarrantyStatus";
import { ApplianceMaintenanceHistoryLoadingSkeleton } from "../global/Skeletons";
import { Button } from "../ui/button";
import {
  AddApplianceMaintenanceDialog,
  ViewApplianceMaintenanceDialog,
} from "./ApplianceDialogs";

function ApplianceMaintenanceHistory({ applianceId }: { applianceId: string }) {
  const { data, isLoading } = useQuery(
    applianceQueries.singleApplianceHistory(applianceId)
  );

  if (isLoading) {
    return <ApplianceMaintenanceHistoryLoadingSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-circular-bold text-black">
            Service & Maintenance History
          </h2>
          <span className="text-sm font-circular-medium text-gray">
            View all service & maintenance history for this appliance.
          </span>
        </div>
        <AddApplianceMaintenanceDialog applianceId={applianceId}>
          <Button className="green-btn  ">
            <Plus />
            <span>Add Maintenance</span>
          </Button>
        </AddApplianceMaintenanceDialog>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data && data.length > 0 ? (
          data.map((maintenance) => (
            <ViewApplianceMaintenanceDialog
              key={maintenance.type}
              maintenance={maintenance}
            >
              <div
                key={maintenance.type}
                className="flex flex-col gap-2 rounded-xl  border border-lighter-gray p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <DisplayWarrantyStatus status={maintenance.type} />
                    <span className="text-sm font-circular-medium text-gray">
                      {format(new Date(maintenance.date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <span className="text-main-green font-circular-bold text-xl">
                    {formatCurrency(maintenance.cost || 0)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h6 className="text-base font-medium font-circular-medium text-black">
                    {maintenance.title}
                  </h6>
                  <span className="text-gray text-xs">
                    {maintenance.details || ""}
                  </span>
                </div>
              </div>
            </ViewApplianceMaintenanceDialog>
          ))
        ) : (
          <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
            <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
              <FileText />
            </div>
            <span className="capitalize">
              No Service & Maintenance History Found For This Appliance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default ApplianceMaintenanceHistory;
