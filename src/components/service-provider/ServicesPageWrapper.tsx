"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NearbyProviderContent from "./NearbyProviderContent";
import SavedProviderContent from "./SavedProviderContent";
import { useServiceProviderStore } from "@/store/serviceProviderStore";
import { FetchServiceProviderParams } from "@/types";
import HiredProviderContent from "./HiredProviderContent";

type Props = {
  homeId: string;
  filterParams: FetchServiceProviderParams;
};

const tabsOptions = [
  {
    value: "saved",
    label: "Saved",
  },
  {
    value: "hired",
    label: "Hired",
  },
  {
    value: "nearby",
    label: "Search Nearby",
  },
];

function ServicesPageWrapper({ homeId, filterParams }: Props) {
  const { mode, setMode } = useServiceProviderStore();
  return (
    <Tabs
      value={mode}
      onValueChange={(val) => setMode(val as "saved" | "hired" | "nearby")}
      className="w-full bg-lighter-gray/50  justify-center items-center pt-6 "
    >
      <TabsList className="bg-white sm:h-9 h-fit w-full sm:w-max sm:flex-row flex-col">
        {tabsOptions.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="h-12 min-w-full sm:min-w-[200px] md:min-w-[233px] data-[state=active]:rounded-2xl data-[state=active]:bg-main-green text-black font-circular-medium data-[state=active]:text-white text-base"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent className="w-full" value="saved">
        <SavedProviderContent filterParams={filterParams} />
      </TabsContent>
      <TabsContent className="w-full" value="hired">
        <HiredProviderContent filterParams={filterParams} />
      </TabsContent>
      <TabsContent value="nearby" className="w-full">
        <NearbyProviderContent homeId={homeId} />
      </TabsContent>
    </Tabs>
  );
}
export default ServicesPageWrapper;
