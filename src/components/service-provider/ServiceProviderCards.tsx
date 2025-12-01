import { GoogleProviderInfo } from "@/types";
import { Button } from "../ui/button";
import { MapPin, Phone, Mail, Footprints, Wrench, Star } from "lucide-react";
import DisplayCategory from "./DisplayCategory";
import { useServiceProviderStore } from "@/store/serviceProviderStore";
import { ServiceProvider } from "@/types/prisma-schema-types";
import {
  HireProviderDialog,
  SavedProviderCardAction,
} from "./ServiceProviderDialogs";
import { SavedProviderSheet } from "./ServiceProviderSheets";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";

type GoogleProviderCardProps = {
  data: GoogleProviderInfo;
  handleSave: (provider: GoogleProviderInfo) => void;
  isLoading: boolean;
};

type SavedProviderCardProps = {
  data: ServiceProvider;
};
export function GoogleProviderCard({
  data,
  isLoading,
  handleSave,
}: GoogleProviderCardProps) {
  const { category } = useServiceProviderStore();
  return (
    <div className="w-full flex flex-col justify-between gap-2 rounded-xl border border-lighter-gray py-4  relative">
      <h6 className="text-black px-4 line-clamp-2 min-h-[3rem] font-circular-bold text-base font-bold">
        {data.name}
      </h6>
      <div className="flex gap-2 px-4 relative flex-col w-full">
        <div className="absolute gap-1 top-0 right-0 bg-main-yellow rounded-l-3xl text-xs text-white px-3 flex items-center justify-center py-1">
          <Star className="shrink-0 fill-white text-white size-3" />
          <span>{data.rating}</span>
        </div>
        <div className="flex  flex-col gap-2">
          <DisplayCategory type={category} />
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Mail className="shrink-0 size-3" />
            <span>{data.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Phone className="shrink-0 size-3" />
            <span>{data.phone || "N/A"}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <MapPin className="shrink-0 size-3" />
            <span>{data.address || "N/A"}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Footprints className="shrink-0 size-3" />
            <span>{data.distance} miles away</span>
          </div>
          <span className="text-gray text-xs">
            {data.totalReviews.toLocaleString()}{" "}
            {data.totalReviews > 1 ? "Reviews" : "Review"}
          </span>
        </div>
        <Button
          disabled={isLoading}
          onClick={() => handleSave(data)}
          className="w-full text-sm font-circular-light green-btn"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

export function SavedProviderCard({ data }: SavedProviderCardProps) {
  const { data: homes, isLoading } = useQuery(userQueries.allHomes({
    page: 1,
    size: 10,
  }));

  return (
    <div className="w-full flex flex-col justify-between gap-2 rounded-xl border border-lighter-gray py-4  relative">
      <div className="flex items-center gap-2 justify-between px-4">
        <h6 className="text-black line-clamp-2  font-circular-bold text-base font-bold">
          {data.name}
        </h6>
        <SavedProviderCardAction data={data} homes={homes?.homes || []} />
      </div>
      <div className="flex gap-2 px-4 relative flex-col w-full">
        <div className="flex  flex-col gap-1.5">
          <DisplayCategory type={data.type} />
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Mail className="shrink-0 size-3" />
            <span>{data.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Phone className="shrink-0 size-3" />
            <span>{data.phone || "N/A"}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <MapPin className="shrink-0 size-3" />
            <span>{data.address || "N/A"}</span>
          </div>{" "}
        </div>
        <div className="w-full grid grid-cols-1 gap-2  md:grid-cols-2">
          <SavedProviderSheet data={data} homes={homes?.homes || []}>
            <Button className="w-full text-sm font-circular-light light-green-btn">
              View
            </Button>
          </SavedProviderSheet>

          <HireProviderDialog data={homes?.homes || []} provId={data.id}>
            <Button
              disabled={isLoading}
              className="w-full green-btn text-sm font-circular-light"
            >
              Add Job
            </Button>
          </HireProviderDialog>
        </div>
      </div>
    </div>
  );
}
export function HiredProviderCard({ data }: SavedProviderCardProps) {
  const { data: homes, isLoading } = useQuery(userQueries.allHomes({
    page: 1,
    size: 10,
  }));

  return (
    <div className="w-full flex flex-col justify-between gap-2 rounded-xl border border-lighter-gray py-4  relative">
      <div className="flex items-center gap-2 justify-between px-4">
        <h6 className="text-black line-clamp-2  font-circular-bold text-base font-bold">
          {data.name}
        </h6>
        <SavedProviderCardAction data={data} homes={homes?.homes || []} />
      </div>
      <div className="flex gap-2 px-4 relative flex-col w-full">
        <div className="flex  flex-col gap-1.5">
          <DisplayCategory type={data.type} />
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Wrench className="shrink-0 size-3" />
            <span>
              {data._count.jobs} Job{data._count.jobs > 1 && "s"}
            </span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Mail className="shrink-0 size-3" />
            <span>{data.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <Phone className="shrink-0 size-3" />
            <span>{data.phone || "N/A"}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
            <MapPin className="shrink-0 size-3" />
            <span>{data.address || "N/A"}</span>
          </div>{" "}
        </div>
        <div className="w-full grid grid-cols-1 gap-2  md:grid-cols-2">
          <SavedProviderSheet data={data} homes={homes?.homes || []}>
            <Button className="w-full text-sm font-circular-light light-green-btn">
              View
            </Button>
          </SavedProviderSheet>

          <HireProviderDialog data={homes?.homes || []} provId={data.id}>
            <Button
              disabled={isLoading}
              className="w-full green-btn text-sm font-circular-light"
            >
              Add Job
            </Button>
          </HireProviderDialog>
        </div>
      </div>
    </div>
  );
}
