"use client";

import { documentQueries } from "@/queries/document";
import { FetchDocumentParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DocumentPageHeader from "./DocumentPageHeader";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../global/DataTable";
import { Document } from "@/types/prisma-schema-types";
import DocumentGridWrapper from "./DocumentGridWrapper";
import PaginationContainer from "../global/PaginationContainer";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { renderDocumentCategoryStyle } from "@/utils/funcs";
import { ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import DocumentActions from "./DocumentActions";

type Props = {
  homeId: string;
  filterParams: FetchDocumentParams;
  viewMode: "grid" | "list";
};

const columns: ColumnDef<Document>[] = [
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
    accessorKey: "title",
    header: "Title",

    cell: ({ row }) => (
      <span className="font-medium font-circular-medium text-sm">
        {row.original.title}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "capitalize font-medium font-circular-medium",
          renderDocumentCategoryStyle(row.original.category)
        )}
      >
        {row.original.category.replace("_", " ")}
      </Badge>
    ),
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
          <span>Date</span>
          <ChevronsUpDown className="size-4" />
        </button>
      );
    },
    accessorKey: "createdAt",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="text-sm  text-black  capitalize">
          {row.original.createdAt
            ? format(row.original.createdAt, "MM/dd/yyyy")
            : "-"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <DocumentActions doc={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
function AllDocumentsPageWrapper({ homeId, filterParams, viewMode }: Props) {
  const { data, isLoading } = useQuery(
    documentQueries.all(homeId, filterParams)
  );
  const [displayMode, setDisplayMode] = useState<"grid" | "list">(
    viewMode || "grid"
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col items-center gap-2 w-full">
      <DocumentPageHeader
        title={
          filterParams.category
            ? `${filterParams.category} Documents`
            : "All Documents"
        }
        count={data?.pagination.totalRecords || 0}
        viewMode={displayMode}
        setViewMode={setDisplayMode}
      />
      {displayMode === "grid" ? (
        <DocumentGridWrapper documents={data?.documents || []} />
      ) : (
        <DataTable
          columns={columns}
          data={data?.documents || []}
          emptyMessage={
            filterParams.category
              ? `No ${filterParams.category} documents found.`
              : "No documents found."
          }
        />
      )}

      <PaginationContainer
        currentPage={filterParams.page || 1}
        totalPages={data?.pagination.totalPages || 1}
        searchKey="search"
        contentTitle="Documents"
      />
    </section>
  );
}
export default AllDocumentsPageWrapper;
