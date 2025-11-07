"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";

import { Button } from "../ui/button";
import { PenLine } from "lucide-react";
import { HomeDetailsWrapperLoadingSkeleton } from "../global/Skeletons";
import { useRouter } from "next/navigation";

type Props = {
  homeId: string;
};
function AppliancePageWrapper({ homeId }: Props) {
  const { replace } = useRouter();
  const { data, isLoading } = useQuery(userQueries.singleHome(homeId));
  if (isLoading) {
    return <HomeDetailsWrapperLoadingSkeleton />;
  }
  if (!data) {
    // replace("/dashboard/profile");
    return <HomeDetailsWrapperLoadingSkeleton />;
  }
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-black text-xl font-circular-medium">
          Property Details & Public Records
        </h1>
        <p className="text-gray text-sm">
          Official property public records and verified details
        </p>
      </div>
     
    </section>
  );
}
export default AppliancePageWrapper;
