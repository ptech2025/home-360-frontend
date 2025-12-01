"use client";

import { useQuery } from "@tanstack/react-query";

import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { applianceQueries } from "@/queries/appliance";
import ApplianceMaintenanceHistory from "./ApplianceMaintenanceHistory";
import {
  AppliancePreviewCard,
  DocumentCard,
  ReminderCard,
  WarrantyCard,
} from "./ApplianceCards";
import Link from "next/link";
import { SingleAppliancePageWrapperLoadingSkeleton } from "../global/Skeletons";

type Props = {
  homeId: string;
  applianceId: string;
};

function SingleAppliancePageWrapper({ homeId, applianceId }: Props) {
  const { push } = useRouter();
  const { data, isLoading } = useQuery(
    applianceQueries.singleAppliance(homeId, applianceId)
  );

  if (isLoading) {
    return <SingleAppliancePageWrapperLoadingSkeleton />;
  }

  if (!data) {
    push(`/dashboard/${homeId}/appliances`);
    return <SingleAppliancePageWrapperLoadingSkeleton />;
  }

  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-black text-xl font-circular-medium">
          Appliance & Equipment Tracker
        </h1>
        <p className="text-gray text-sm">
          Keep all your appliances organized, under warranty, and recall-ready
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 w-max bg-transparent border-none shadow-none text-base font-circular-medium hover:bg-transparent group"
        asChild
      >
        <Link href={`/dashboard/${homeId}/appliances`}>
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-all duration-300" />
          <span className="text-sm">Back to Appliances</span>
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        <div className="flex flex-col gap-4">
          <AppliancePreviewCard appliance={data} />
          <ApplianceMaintenanceHistory applianceId={data.id} />
        </div>
        <div className="flex flex-col gap-4">
          <WarrantyCard appliance={data} />
          <ReminderCard appliance={data} />
          <DocumentCard appliance={data} />
        </div>
      </div>
    </section>
  );
}

export default SingleAppliancePageWrapper;
