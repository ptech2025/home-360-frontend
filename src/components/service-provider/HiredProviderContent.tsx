import { FetchServiceProviderParams } from "@/types";
import { HiredProviderCard } from "./ServiceProviderCards";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "../ui/empty";
import { Wrench } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { providerQueries } from "@/queries/provider";
import { Button } from "../ui/button";
import PaginationContainer from "../global/PaginationContainer";
import {
  ProviderRatingFilter,
  ProviderTypeFilter,
} from "./ServiceProviderFilters";
import SearchBar from "../global/SearchBar";
import { AddOrEditDocumentDialog } from "../document/DocumentDialogs";

type Props = {
  filterParams: FetchServiceProviderParams;
};

function HiredProviderContent({ filterParams }: Props) {
  const { data, isLoading } = useQuery(providerQueries.allHired(filterParams));
  return (
    <section className="min-h-svh bg-white rounded-t-md px-6 py-4 mt-4 w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="capitalize text-black font-medium font-circular-medium text-xl">
            Your Hired Service Providers
          </h2>
          <p className="text-sm text-black">
            Manage and keep track of the professionals you’ve hired for this
            home.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ProviderTypeFilter />
          <ProviderRatingFilter />
          <SearchBar searchKey="search" placeHolder="Search by name" />
        </div>
      </div>

      {isLoading && (
        <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-full rounded-xl h-[220px]" />
          ))}
        </div>
      )}
      {!isLoading && (!data || data.providers.length === 0) && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Wrench />
            </EmptyMedia>
            <EmptyTitle>
              No Hired Service Providers Found For This Home{" "}
            </EmptyTitle>
            <EmptyDescription>
              {" "}
              reset filters, clear search, or hire from saved
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {!isLoading && data && data.providers.length > 0 && (
        <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
          {data.providers.map((provider) => (
            <HiredProviderCard key={provider.id} data={provider} />
          ))}
        </div>
      )}
      <PaginationContainer
        searchKey="search"
        currentPage={filterParams.page || 1}
        contentTitle="Service Providers"
        totalPages={data?.pagination.totalPages || 1}
        size={filterParams.size}
      />
    </section>
  );
}
export default HiredProviderContent;
