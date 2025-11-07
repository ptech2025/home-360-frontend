"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FetchAppliancesParams } from "@/types";
import { applianceQueries } from "@/queries/appliance";
import ApplianceMetricsWrapper from "./ApplianceMetricsWrapper";
import ApplianceGridWrapper from "./ApplianceGridWrapper";
import AppliancePageHeader from "./AppliancePageHeader";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../global/DataTable";
import { ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import PaginationContainer from "../global/PaginationContainer";
import DisplayWarrantyStatus from "./DisplayWarrantyStatus";
import { AppliancePageWrapperLoadingSkeleton } from "../global/Skeletons";
import { ApplianceWithWarranty } from "@/types";
import ApplianceActions from "./ApplianceActions";

type Props = {
  homeId: string;
  filterParams: FetchAppliancesParams;
};

const columns: ColumnDef<ApplianceWithWarranty>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="data-[state=checked]:bg-main-green data-[state=checked]:border-main-green"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="data-[state=checked]:bg-main-green data-[state=checked]:border-main-green"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium font-circular-medium text-sm">
          {row.original.name}
        </span>
        <span className="text-xs text-gray font-circular-light">
          {row.original.brand && `${row.original.brand}`}
          {row.original.model && ` • ${row.original.model}`}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm capitalize text-gray">
        {row.original.category.replace("_", " ")}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "warrantyStatus",
    header: "Warranty",
    cell: ({ row }) => {
      return <DisplayWarrantyStatus status={row.original.warrantyStatus} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={column.getToggleSortingHandler()}
          className="flex cursor-pointer justify-between w-max gap-4 items-center"
        >
          <span>Date Added</span>
          <ChevronsUpDown className="size-4" />
        </button>
      );
    },
    accessorKey: "createdAt",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="text-sm text-black capitalize">
          {row.original.createdAt
            ? format(new Date(row.original.createdAt), "MM/dd/yyyy")
            : "-"}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => <ApplianceActions appliance={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

function AppliancePageWrapper({ homeId, filterParams }: Props) {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const { data, isLoading } = useQuery(
    applianceQueries.allAppliances(homeId, filterParams)
  );

  if (isLoading) {
    return <AppliancePageWrapperLoadingSkeleton />;
  }

  if (!data) {
    return <AppliancePageWrapperLoadingSkeleton />;
  }

  const appliances = "appliances" in data ? data.appliances : [];
  const pagination = "pagination" in data ? data.pagination : undefined;

  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-black text-xl font-circular-medium">
          Appliance & Equipment Tracker
        </h1>
        <p className="text-gray text-sm">
          Keep all your appliances organized, under warranty, and recall-ready
        </p>
      </div>
      <ApplianceMetricsWrapper homeId={homeId} />
      <div className="flex flex-col items-center min-h-screen  w-full bg-white rounded-t-md p-4 gap-6">
        <AppliancePageHeader
          title={
            filterParams.category
              ? `${filterParams.category} Appliances`
              : "All Appliances"
          }
          count={pagination?.totalRecords || appliances.length}
          viewMode={displayMode}
          setViewMode={setDisplayMode}
        />
        {displayMode === "grid" ? (
          <ApplianceGridWrapper appliances={appliances} />
        ) : (
          <DataTable
            columns={columns}
            data={appliances}
            emptyMessage={
              filterParams.category
                ? `No ${filterParams.category} appliances found.`
                : "No appliances found."
            }
          />
        )}

        {pagination && (
          <PaginationContainer
            currentPage={filterParams.page || 1}
            totalPages={pagination.totalPages || 1}
            searchKey="search"
            contentTitle="Appliances"
            size={filterParams.size}
          />
        )}
      </div>
    </section>
  );
}

export default AppliancePageWrapper;
