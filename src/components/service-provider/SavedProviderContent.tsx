import { FetchServiceProviderParams } from "@/types";
import { SavedProviderCard } from "./ServiceProviderCards";
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "../ui/empty";
import { Plus, Wrench } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { providerQueries } from "@/queries/provider";
import { Button } from "../ui/button";
import PaginationContainer from "../global/PaginationContainer";
import SearchBar from "../global/SearchBar";
import { AddOrEditProviderDialog } from "./ServiceProviderDialogs";
import { ProviderTypeFilter } from "./ServiceProviderFilters";

type Props = {
  filterParams: FetchServiceProviderParams;
};

function SavedProviderContent({ filterParams }: Props) {
  const { data, isLoading } = useQuery(providerQueries.allSaved(filterParams));
  return (
    <section className="min-h-svh bg-white rounded-t-md px-6 py-4 mt-4 w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="capitalize text-black font-medium font-circular-medium text-xl">
            Your Saved Service Providers
          </h2>
          <p className="text-sm text-black">
            Easily access and manage your trusted professionals
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ProviderTypeFilter />
          <SearchBar searchKey="search" placeHolder="Search by name" />
          <AddOrEditProviderDialog type="create">
            <Button className="text-sm font-circular-medium yellow-btn">
              <Plus />
              <span className="hidden sm:block">Add Service Provider</span>
            </Button>
          </AddOrEditProviderDialog>
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
            <EmptyTitle>No Saved Service Providers Found </EmptyTitle>
            <EmptyDescription>
              reset filters, clear search, or add manually
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <AddOrEditProviderDialog type="create">
              <Button className="text-sm font-circular-medium yellow-btn">
                <Plus />
                <span>Add Service Provider</span>
              </Button>
            </AddOrEditProviderDialog>
          </EmptyContent>
        </Empty>
      )}

      {!isLoading && data && data.providers.length > 0 && (
        <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
          {data.providers.map((provider) => (
            <SavedProviderCard key={provider.id} data={provider} />
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
export default SavedProviderContent;
