import { Trash2, CalendarOff, FileText, Pencil } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  AddOrEditApplianceDialog,
  DeleteApplianceDialog,
} from "./ApplianceDialogs";
import { FetchSingleApplianceResponse } from "@/types";
import Image from "next/image";
import { formatDate } from "date-fns";
import { formatCurrency } from "@/utils/funcs";
import DisplayWarrantyStatus from "@/components/appliance/DisplayWarrantyStatus";

type Props = {
  appliance: FetchSingleApplianceResponse;
};

export function AppliancePreviewCard({ appliance }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-circular-bold text-black">
            {appliance.name}
          </h2>
          <span className="text-sm font-circular-medium text-gray capitalize">
            {appliance.category.replace("_", "")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AddOrEditApplianceDialog type="update" data={appliance}>
            <Button
              variant="outline"
              className="gap-2 w-max bg-transparent items-center text-sm font-circular-medium hover:bg-transparent group text-black hover:text-main-greens"
            >
              <Pencil className="size-4" />
              <span className="align-middle block leading-[1px]">Edit</span>
            </Button>
          </AddOrEditApplianceDialog>

          <DeleteApplianceDialog applianceId={appliance.id}>
            <Button
              variant="outline"
              className="gap-2 w-max bg-transparent items-center text-sm font-circular-medium hover:bg-transparent group text-destructive"
            >
              <Trash2 className="size-4" />
              <span className="align-middle block leading-[1px]">Delete</span>
            </Button>
          </DeleteApplianceDialog>
        </div>
      </div>
      <div className="flex items-center justify-center bg-lighter-gray/50 rounded-md p-2 min-h-[240px]">
        {appliance.image && (
          <Image
            src={appliance.image}
            alt={appliance.name}
            width={300}
            height={300}
            className="size-[300px] object-contain"
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-circular-medium text-gray">Brand</span>
          <span className="text-base capitalize font-circular-medium text-black">
            {appliance.brand ?? "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-circular-medium text-gray">Model</span>
          <span className="text-base font-circular-medium text-black capitalize">
            {appliance.model ?? "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-circular-medium text-gray">
            Serial Number
          </span>
          <span className="text-base capitalize font-circular-medium text-black">
            {appliance.serialNumber ?? "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-circular-medium text-gray">
            Purchase Date
          </span>
          <span className="text-base capitalize font-circular-medium text-black">
            {appliance.purchaseDate
              ? formatDate(new Date(appliance.purchaseDate), "MMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-circular-medium text-gray">
            Purchase Price
          </span>
          <span className="text-base font-circular-medium text-black">
            {appliance.purchasePrice
              ? formatCurrency(appliance.purchasePrice)
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WarrantyCard({ appliance }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <h2 className="text-xl font-circular-bold text-black">
        Warranty Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-base font-circular-medium text-black">
            Status
          </span>
          <DisplayWarrantyStatus
            status={appliance.warranty?.status ?? "No Warranty"}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-base font-circular-medium text-black">
            Warranty Expiry
          </span>
          <span className="text-sm capitalize font-circular-medium text-gray">
            {appliance.warranty?.expiryDate
              ? formatDate(
                  new Date(appliance.warranty?.expiryDate),
                  "MMM dd, yyyy"
                )
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ReminderCard({ appliance }: Props) {
  const reminder = appliance.reminder;
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <h2 className="text-xl font-circular-bold text-black">
        Upcoming Reminders
      </h2>
      <div className="flex h-full flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
        {
          <>
            {reminder ? (
              <div className="flex items-start gap-2  bg-light-gray/10 rounded-md p-2 w-full h-13">
                <span className={"rounded-md w-1 min-h-full bg-main-yellow"}>
                  {" "}
                </span>
                <div className="flex flex-col gap-1">
                  <h6 className="text-sm font-medium font-circular-medium text-black">
                    {reminder.title}
                  </h6>
                  <span className="text-gray text-xs">
                    {formatDate(new Date(reminder.dueDate), "MMM dd")},{" "}
                    {formatDate(new Date(reminder.dueDate), "HH:mm aa")}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
                <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
                  <CalendarOff />
                </div>
                <span className="capitalize">
                  No Upcoming Reminders Found For This Appliance
                </span>
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

export function DocumentCard({ appliance }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <h2 className="text-xl font-circular-bold text-black">Documents</h2>
      <div className="grid grid-cols-1 gap-4">
        {appliance.documents && appliance.documents.length > 0 ? (
          appliance.documents.map((doc) => (
            <div
              key={doc.url}
              className="flex  gap-3 justify-between items-center"
            >
              <h6 className="text-sm font-medium font-circular-medium text-black">
                {doc.url.split("/").pop()?.split(".")[0]}
              </h6>

              <Button
                size="icon"
                variant="outline"
                asChild={doc.previewUrl ? true : false}
                className="gap-2 w-max bg-transparent items-center text-sm font-circular-medium hover:bg-transparent group text-black"
              >
                {doc.previewUrl ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <FileText />
                  </a>
                ) : (
                  <FileText />
                )}
              </Button>
            </div>
          ))
        ) : (
          <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
            <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
              <FileText />
            </div>
            <span className="capitalize">
              No Documents Found For This Appliance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
