"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";
import { AuthUserType, FetchHomesParams } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import HomesPageHeader from "./HomesPageHeader";
import PaginationContainer from "../global/PaginationContainer";
import HomeCard from "./HomeCard";
import { Skeleton } from "../ui/skeleton";

function AllHomesPageWrapper({
  user,
  homeId,
  fetchParams,
}: {
  user: AuthUserType;
  homeId: string;
  fetchParams: FetchHomesParams;
}) {
  const { data, isLoading } = useQuery(userQueries.allHomes(fetchParams));

  return (
    <div className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-dvh">
      <div className="flex gap-2 w-full items-center">
        <Avatar className="size-18">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-circular-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 w-max bg-transparent border-none shadow-none text-base font-circular-medium hover:bg-transparent group"
        asChild
      >
        <Link href={`/dashboard/${homeId}/details`}>
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-all duration-300" />
          <span className="text-sm">Back to Home Details</span>
        </Link>
      </Button>
      <div className="flex flex-col gap-4 min-h-dvh p-4 bg-white rounded-md">
        <HomesPageHeader count={data?.pagination.totalRecords || 0} />
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col gap-2 rounded-xl border border-lighter-gray p-4"
              >
                <div className="flex relative min-h-[200px] items-center gap-2 justify-center bg-lighter-gray/50 p-2 rounded-md">
                  <Skeleton className="h-[100px] w-[100px] rounded-md" />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            ))
          ) : data && data.homes.length > 0 ? (
            data.homes.map((home) => (
              <HomeCard key={home.id} home={home} currentHomeId={homeId} />
            ))
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">No homes found</p>
            </div>
          )}
        </div>
        <PaginationContainer
          currentPage={fetchParams.page || 1}
          totalPages={data?.pagination.totalPages || 0}
          searchKey="search"
          contentTitle="homes"
        />
      </div>
    </div>
  );
}
export default AllHomesPageWrapper;
