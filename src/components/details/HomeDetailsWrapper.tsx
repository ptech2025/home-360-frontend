"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";
import { Badge } from "../ui/badge";
import { renderValue } from "@/utils/funcs";
import {
  UpdateHomeAddressDialog,
  UpdateHomeDetailsDialog,
} from "./HomeDialogs";
import { Button } from "../ui/button";
import { PenLine } from "lucide-react";
import { HomeDetailsWrapperLoadingSkeleton } from "../global/Skeletons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthUserType } from "@/types";
import { canPerformAIQuery } from "@/utils/funcs";
import UpgradePrompt from "../global/UpgradePrompt";
type Props = {
  homeId: string;
  user: AuthUserType | null;
};
function HomeDetailsWrapper({ homeId, user }: Props) {
  const { replace } = useRouter();
  const { data, isLoading } = useQuery(userQueries.singleHome(homeId));
  const hasAIQueryPermission = canPerformAIQuery(user, {
    allocated: user?.userQuotas?.allocatedAiQueryCredits ?? 0,
    used: user?.userQuotas?.aiQueryCreditsUsed ?? 0,
    remaining:
      (user?.userQuotas?.allocatedAiQueryCredits ?? 0) -
        (user?.userQuotas?.aiQueryCreditsUsed ?? 0) || 0,
  });
  if (isLoading) {
    return <HomeDetailsWrapperLoadingSkeleton />;
  }
  if (!data) {
    replace("/dashboard/profile");
    return <HomeDetailsWrapperLoadingSkeleton />;
  }
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      <div className="flex items-start justify-start gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-black text-xl font-circular-medium">
            Property Details & Public Records
          </h1>
          <p className="text-gray text-sm">
            Official property public records and verified details
          </p>
        </div>
        <Button asChild className="green-btn h-11">
          <Link href={`/dashboard/${homeId}/all`}>View Homes</Link>
        </Button>
      </div>
      <div className="md:grid-cols-4 grid grid-cols-1 gap-4">
        <div className="rounded-xl flex flex-col gap-4 bg-white p-6 relative">
          <span className="text-base font-circular-bold text-gray">
            Property Address
          </span>
          <h4 className="text-xl capitalize font-circular-bold text-black">
            {data.address || "N/A"}
          </h4>
          <UpdateHomeAddressDialog
            homeId={homeId}
            address={data.address?.split(",")[0]}
            city={data.address?.split(",")[1]}
            state={data.address?.split(",")[2]}
          >
            <Button
              disabled={!hasAIQueryPermission.allowed}
              className="text-black hover:bg-white border w-max  bg-white border-black hover:text-main-green hover:border-main-green"
            >
              <PenLine className="size-4" />
              <span>Change Address</span>
            </Button>
          </UpdateHomeAddressDialog>
          {!hasAIQueryPermission.allowed && (
            <UpgradePrompt
              reason={hasAIQueryPermission.reason}
              upgradeMessage={hasAIQueryPermission.upgradeMessage}
              className="top-40"
            />
          )}
        </div>
        <div className="rounded-xl bg-white p-6 flex flex-col gap-4 ">
          <span className="text-base font-circular-bold text-gray">County</span>
          <h4 className="text-xl capitalize font-circular-bold text-black">
            {data.records[0]?.data.county ?? "N/A"}
          </h4>
          <span className="text-sm text-gray">Data Source: County API</span>
        </div>
        <div className="rounded-xl relative bg-white p-6 flex flex-col gap-4 ">
          <span className="text-base font-circular-bold text-gray">
            Property Type
          </span>
          <h4 className="text-xl capitalize font-circular-bold text-black">
            {data.homeType}
          </h4>
          <Badge className="absolute top-4 right-4 py-1 text-main-green bg-main-green/10 text-xs font-circular-medium">
            Verified
          </Badge>
          <span className="text-sm text-gray">Data Source: County API</span>
        </div>
        <div className="rounded-xl relative bg-white p-6 flex flex-col gap-4 ">
          {data.photoUrl ? (
            <div className="relative h-[150px] w-full rounded-md">
              <Image
                src={data.photoUrl}
                alt="Property Image"
                fill
                priority
                className="w-full h-full object-cover rounded-md object-center"
              />
            </div>
          ) : (
            <div className="size-full flex items-center justify-center bg-lighter-gray/50 rounded-md">
              <span className="text-sm text-gray">No Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-xl font-circular-bold text-black">
              Property Details
            </h4>
            <UpdateHomeDetailsDialog
              homeId={homeId}
              bedrooms={data.bedrooms}
              bathrooms={data.bathrooms}
              yearBuilt={data.yearBuilt}
              squareFeet={data.squareFeet}
              lotSizeSqFt={data.lotSizeSqFt}
              homeType={data.homeType}
              photoUrl={data.photoUrl}
            >
              <Button className="text-black hover:bg-white border w-max  bg-white border-black hover:text-main-green hover:border-main-green">
                <PenLine className="size-4" />
                <span>Edit Details</span>
              </Button>
            </UpdateHomeDetailsDialog>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
            {Object.entries({
              bedrooms: data.bedrooms,
              bathrooms: data.bathrooms,
              yearBuilt: data.yearBuilt,
              squareFeet: data.squareFeet,
              lotSizeSqFt: data.lotSizeSqFt,
              homeType: data.homeType,
              homeValue: data.homeValue,
            }).map(([key, value]) => (
              <div
                key={`details-${key}`}
                className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
              >
                <span className="text-sm text-black capitalize font-circular-medium">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-main-green line-clamp-1 capitalize text-sm font-circular-medium">
                  {renderValue(key, value)}
                </span>
              </div>
            ))}
          </div>

          <div
            className="items-center text-sm font-circular-medium text-main-yellow border-main-yellow bg-main-yellow/10 border rounded-xl w-full p-4
          "
          >
            <span>If information appears outdated, edit property details.</span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
          <h4 className="text-xl font-circular-bold text-black">
            Public Record Details
          </h4>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
            {data.records.flatMap((record) =>
              Object.entries(record.data).map(([key, value]) => (
                <div
                  key={`${record.id}-${key}`}
                  className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
                >
                  <span className="text-sm text-black capitalize font-circular-medium">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-main-green line-clamp-1 capitalize text-sm font-circular-medium">
                    {renderValue(key, value)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default HomeDetailsWrapper;
