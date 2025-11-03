import { Wrench } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { providerQueries } from "@/queries/provider";
import { ServicesWrapperLoadingSkeleton } from "../global/Skeletons";
import { SavedProviderSheet } from "../service-provider/ServiceProviderSheets";
import { userQueries } from "@/queries/user";

function ServicesWrapper({ homeId }: { homeId: string }) {
  const { data: homeData, isLoading: isHomeLoading } = useQuery(
    userQueries.allHomes()
  );
  const { data, isLoading } = useQuery(
    providerQueries.allHired({
      page: 1,
      size: 5,
      homeId,
    })
  );

  if (isLoading || isHomeLoading) return <ServicesWrapperLoadingSkeleton />;

  return (
    <div className="flex gap-3 shrink-0 rounded-md shadow-sm shadow-light-gray/50  h-[20rem] lg:max-w-[20rem]  flex-col p-2  flex-1">
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-sm text-black font-medium font-circular-medium">
          Top Rated Service Providers
        </h4>
        <Button
          size={"icon"}
          asChild
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <Link href={`/dashboard/${homeId}/services`}>
            <Wrench />
          </Link>
        </Button>
      </div>
      {data && data.providers.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
          {data.providers.map((provider) => (
            <SavedProviderSheet
              key={provider.id}
              data={provider}
              homes={homeData || []}
            >
              <div className="flex items-start gap-2 hover:bg-main-green/20  bg-light-gray/10 rounded-md p-2 w-full h-13 cursor-pointer">
                <span className="rounded-md bg-main-green w-1 min-h-full">
                  {" "}
                </span>
                <div className="flex flex-col gap-1">
                  <h6 className="text-sm font-medium font-circular-medium text-black">
                    {provider.name}
                  </h6>
                  <div className="flex items-center gap-1">
                    <span className="text-gray capitalize text-xs">
                      {provider.type.replace("_", " ")}
                    </span>
                    <span className="bg-gray size-1 rounded-full"></span>
                    <span className="text-gray text-xs">
                      {provider._count.jobs} Job
                      {provider._count.jobs > 1 && "s"}
                    </span>
                  </div>
                </div>
              </div>
            </SavedProviderSheet>
          ))}
        </div>
      ) : (
        <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
          <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
            <Wrench />
          </div>
          <span>No Rated Service Providers</span>
        </div>
      )}
    </div>
  );
}

export default ServicesWrapper;
