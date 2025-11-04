import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { Home } from "@/types/prisma-schema-types";
import { formatCurrency } from "@/utils/funcs";
import { Button } from "../ui/button";
import Link from "next/link";
type OverviewCardProps = {
  home: Home;
};

export function DashboardOverview({ home }: OverviewCardProps) {
  const { isPending, data } = authClient.useSession();
  return (
    <div className="w-full shadow-light-gray/50 shadow-xs lg:max-w-[30rem] lg:min-h-[12rem] bg-main-green rounded-md py-6 px-4 flex-col gap-6 lg:gap-8 flex">
      <div className="flex justify-between lg:items-start gap-4 items-center lg:flex-row flex-col">
        {isPending ? (
          <Skeleton className="w-1/3 h-6" />
        ) : (
          <h4 className="text-white font-circular-light text-sm">
            Welcome {data?.user.name || ""}
          </h4>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-white font-circular-light text-sm">
            Current Home Value
          </span>
          <h5 className="text-white font-circular-bold font-bold text-xl lg:text-2xl">
            {formatCurrency(home.homeValue || 0)}
          </h5>
        </div>
      </div>
      <div className="flex justify-between gap-4 lg:items-end items-center lg:flex-row flex-col">
        <div className="flex items-center lg:items-start flex-col">
          <span className="text-white font-circular-light text-xs">
            Property Details
          </span>

          <p className="text-white text-center lg:text-start font-circular-medium font-medium text-xl lg:text-2xl">
            {home.address || ""}
          </p>
          <div className="w-full flex flex-wrap gap-1.5 justify-center lg:justify-start items-center">
            {home.squareFeet && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.squareFeet} sqft
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.bedrooms && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.bedrooms} Bedrooms
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.bathrooms && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.bathrooms} Bathrooms
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.yearBuilt && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  Year Built: {home.yearBuilt}
                </span>
              </>
            )}{" "}
          </div>
        </div>
        <Button
          asChild
          className="w-full shrink-0 lg:w-max text-main-green px-4 bg-white border border-transparent hover:bg-light-gray shadow-none hover:text-white duration-300 hover:border-white"
        >
          <Link href={`/dashboard/${home.id}/public-records`}>
            Public Records
          </Link>
        </Button>
      </div>
    </div>
  );
}
