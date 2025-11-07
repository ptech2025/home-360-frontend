import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ServiceProvider, Home } from "@/types/prisma-schema-types";
import DisplayCategory from "./DisplayCategory";
import {
  Earth,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Star,
  Wrench,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { providerQueries } from "@/queries/provider";
import { useParams } from "next/navigation";
import { formatDate } from "date-fns";
import {
  AddOrEditProviderDialog,
  HireProviderDialog,
} from "./ServiceProviderDialogs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import StarRating from "./StartRating";
import { formatCurrencyWithSuffix } from "@/utils/funcs";

export function SavedProviderSheet({
  children,
  data,
  homes,
}: {
  children: React.ReactNode;
  data: ServiceProvider;
  homes: Home[];
}) {
  const { homeId } = useParams();
  const { data: historyData, isLoading } = useQuery(
    providerQueries.singleHistory(homeId as string, data.id, data.isHired)
  );
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle className="font-circular-bold">
            Service Provider Details
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-2 px-4">
          <h6 className="text-black line-clamp-2  font-circular-bold text-sm font-bold">
            {data.name}
          </h6>
          <div className="flex  flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <DisplayCategory type={data.type} />
              {data.isHired && (
                <Badge className="flex rounded-xl items-center gap-2 text-white bg-main-green text-xs font-circular-medium">
                  <Star className="shrink-0 size-3 fill-white" />
                  <span>{data.avgRating || 0}</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
              <Mail className="shrink-0 size-4" />
              {data.email ? (
                <a
                  href={`mailto:${data.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main-green hover:underline cursor-pointer"
                >
                  {data.email}
                </a>
              ) : (
                <span>N/A</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
              <Phone className="shrink-0 size-4" />
              {data.phone ? (
                <a
                  href={`tel:${data.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main-green hover:underline cursor-pointer"
                >
                  {data.phone}
                </a>
              ) : (
                <span>N/A</span>
              )}
            </div>{" "}
            <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
              <Earth className="shrink-0 size-4" />

              {data.website ? (
                <a
                  href={`${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main-green hover:underline cursor-pointer"
                >
                  {data.website}
                </a>
              ) : (
                <span>N/A</span>
              )}
            </div>{" "}
            <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
              <MapPin className="shrink-0 size-4" />
              {data.address ? (
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    data.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main-green hover:underline cursor-pointer"
                >
                  {data.address}
                </a>
              ) : (
                <span>N/A</span>
              )}
            </div>{" "}
            {data.isHired && (
              <>
                <div className="flex items-center gap-2 text-gray text-xs font-circular-medium">
                  <Wrench className="shrink-0  size-4" />

                  <span>
                    {data._count.jobs || 0} Job{data._count.jobs > 1 && "s"}
                  </span>
                </div>{" "}
              </>
            )}
          </div>
          <SheetDescription className="text-gray">
            {data.notes || "No notes"}
          </SheetDescription>

          <div className="mt-2">
            <div className="font-circular-medium w-full text-main-yellow  border-0 border-b border-main-yellow">
              <span> Jobs ({data.isHired ? data._count.jobs : 0})</span>
            </div>
            <ScrollArea className="w-full  h-[300px] py-2">
              <div className="flex-col flex justify-center items-center gap-2">
                {isLoading && (
                  <Loader2 className="animate-spin text-main-yellow size-6 mx-auto" />
                )}
                {!isLoading && (!historyData || historyData.length === 0) && (
                  <h5 className="text-gray text-xs font-circular-medium">
                    No Jobs Added
                  </h5>
                )}

                {!isLoading &&
                  historyData &&
                  historyData.length > 0 &&
                  historyData.map((job) => (
                    <div
                      key={job.id}
                      className="flex w-full bg-lighter-gray/50 rounded-lg p-2 flex-col gap-1.5 "
                    >
                      <div className="w-full justify-between flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs block font-circular-light text-gray">
                            {formatDate(new Date(job.date), "MMM dd, yyyy")}
                          </span>{" "}
                          <span className="bg-gray block size-1 shrink-0 rounded-full"></span>
                          {job.invoiceUrl && job.previewUrl ? (
                            <a
                              href={job.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-main-green block text-xs hover:underline cursor-pointer"
                            >
                              <span className="text-xs font-circular-light text-main-green underline">
                                Preview File
                              </span>
                            </a>
                          ) : (
                            <span className="text-xs block font-circular-light text-gray">
                              No File
                            </span>
                          )}
                        </div>
                        <StarRating
                          rating={job.rating || 0}
                          className="size-3!"
                        />
                      </div>
                      <div className="flex items-center gap-1 ">
                        <span className="text-xs block font-circular-light text-gray">
                          Home:
                        </span>
                        <span className="text-xs font-circular-medium">
                          {job.home.address ?? "N/A"}
                        </span>
                      </div>{" "}
                      <div className="flex items-center gap-1 ">
                        <span className="text-xs block font-circular-light text-gray">
                          Amount Paid:
                        </span>
                        <span className="text-xs font-circular-medium">
                          {formatCurrencyWithSuffix(job.amount || 0)}
                        </span>
                      </div>
                      <p className="text-black text-sm font-circular-light">
                        {job.jobDescription || ""}
                      </p>
                    </div>
                  ))}
              </div>
            </ScrollArea>{" "}
          </div>
        </div>
        <SheetFooter className="grid bg-white w-full grid-cols-2 absolute bottom-0 left-0">
          <AddOrEditProviderDialog type="update" data={data}>
            <Button className="light-green-btn">Edit</Button>
          </AddOrEditProviderDialog>

          <HireProviderDialog provId={data.id} data={homes}>
            <Button className="green-btn">
              {data.isHired ? "Add Job" : "Hire Now"}
            </Button>
          </HireProviderDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
