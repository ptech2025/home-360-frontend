import { GoogleServiceFilter } from "./ServiceProviderFilters";
import { useMutation, useQuery } from "@tanstack/react-query";
import { providerMutations, providerQueries } from "@/queries/provider";
import { GoogleProviderCard } from "./ServiceProviderCards";
import { Button } from "../ui/button";
import { Plus, Search, Wrench } from "lucide-react";
import { useState } from "react";
import AutoCompleteAddress from "../onboarding/AutoCompleteAddress";
import { Skeleton } from "../ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GoogleProviderInfo } from "@/types";
import { CreateServiceProviderSchemaType } from "@/types/zod-schemas";
import { useServiceProviderStore } from "@/store/serviceProviderStore";
import { toast } from "sonner";
import { AddOrEditProviderDialog } from "./ServiceProviderDialogs";

function NearbyProviderContent({ homeId }: { homeId: string }) {
  const { setMode, category, rating, search, setSearch } =
    useServiceProviderStore();
  const [searchVal, setSearchVal] = useState<string | undefined>(search);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: providerMutations.create,
    onSuccess: () => {
      toast.success("Service Provider Saved Successfully.");
      setMode("saved");
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      setLoadingId(null);
      context.client.invalidateQueries({
        queryKey: [
          "all-providers-saved",
          {
            page: 1,
          },
        ],
      });
    },
  });
  const { data, isLoading } = useQuery(
    providerQueries.getNearby({
      type: category,
      rating,
      search,
      homeId: search && search.length > 0 ? undefined : homeId,
    })
  );

  const handleSearch = () => {
    if (searchVal && searchVal.length > 0) {
      setSearch(searchVal);
    }
  };
  const handleSave = (provider: GoogleProviderInfo) => {
    setLoadingId(provider.id);
    const serviceProvider: CreateServiceProviderSchemaType = {
      name: provider.name,
      address: provider.address,
      phone: provider.phone || undefined,
      website: provider.website || undefined,
      email: provider.email || undefined,
      type: category,
    };
    mutate(serviceProvider);
  };

  return (
    <section className="px-4 min-h-dvh py-4  grid grid-cols-1 md:grid-cols-[0.3fr_1fr] gap-2 ">
      <GoogleServiceFilter />
      <div className="min-h-svh bg-white rounded-t-md p-4 w-full flex flex-col gap-6">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
          <h2 className="capitalize text-black font-medium font-circular-medium text-xl">
            {data ? data.length : 0} {category.replace("_", " ")} Service
            Providers Nearby{" "}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <AutoCompleteAddress
              value={searchVal || ""}
              onChange={setSearchVal}
              isFormLoading={isLoading || isPending}
              citiesOnly={false}
              placeholder="Search by address"
            />

            <Button
              onClick={handleSearch}
              disabled={
                isLoading || isPending || !searchVal || searchVal.length === 0
              }
              className="yellow-btn"
            >
              <Search />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full rounded-xl h-[220px]" />
            ))}
          </div>
        )}
        {!isLoading && (!data || data.length === 0) && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Wrench />
              </EmptyMedia>
              <EmptyTitle className="capitalize font-circular-medium">
                No {category.replace("_", " ")} Service Providers Found{" "}
                {search ? `in ${search}` : " "}
              </EmptyTitle>
              <EmptyDescription className="text-gray">
                reset filter or add manually
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

        {!isLoading && data && data?.length > 0 && (
          <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
            {data.map((provider) => (
              <GoogleProviderCard
                key={provider.id}
                data={provider}
                isLoading={loadingId === provider.id}
                handleSave={handleSave}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default NearbyProviderContent;
