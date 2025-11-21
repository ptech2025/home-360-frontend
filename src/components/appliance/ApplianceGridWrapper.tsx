"use client";

import { ApplianceWithWarranty } from "@/types";
import DisplayWarrantyStatus from "./DisplayWarrantyStatus";
import { Button } from "../ui/button";
import { AddApplianceMaintenanceDialog } from "./ApplianceDialogs";
import Link from "next/link";
import Image from "next/image";
import ApplianceEmpty from "./ApplianceEmpty";

type ApplianceGridWrapperProps = {
  appliances: ApplianceWithWarranty[];
};

// Helper function to get warranty status badge style

function ApplianceGridWrapper({ appliances }: ApplianceGridWrapperProps) {
  if (appliances.length === 0) {
    return <ApplianceEmpty />;
  }

  return (
    <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] ">
      {appliances.map((appliance) => (
        <div
          key={appliance.id}
          className="rounded-xl w-full flex justify-between flex-col gap-3 p-4 bg-white border border-lighter-gray"
        >
          <div className="bg-lighter-gray/50 rounded-md h-[160px] w-full flex items-center justify-center relative">
            {appliance.image && (
              <Image
                src={appliance.image}
                alt={appliance.name}
                fill
                priority
                className="object-cover object-center aspect-square"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-black text-xl font-circular-bold">
              {appliance.name}
            </h5>
            <span className="text-sm capitalize text-gray">
              {appliance.category.replace("_", " ")}
            </span>
            <span className="text-xs text-gray capitalize">
              {appliance.brand && `${appliance.brand}`}
              {appliance.model && ` • ${appliance.model}`}
            </span>
            <DisplayWarrantyStatus status={appliance.warrantyStatus} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 justify-between w-full items-center">
            <Button
              asChild
              className="border hover:bg-light-gray bg-white border-light-gray text-black"
            >
              <Link
                href={`/dashboard/${appliance.homeId}/appliances/${appliance.id}`}
              >
                <span>View Details</span>
              </Link>
            </Button>
            <AddApplianceMaintenanceDialog applianceId={appliance.id}>
              <Button className="green-btn">
                <span>Add Maintenance</span>
              </Button>
            </AddApplianceMaintenanceDialog>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplianceGridWrapper;
