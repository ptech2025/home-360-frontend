"use client";
import { EstimateLineItem } from "@/types/estimate";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/funcs";
import { EstimateLineItemCategoryDropdownMenu } from "./EstimateDropdownMenus";

type Props = {
  lineItems: EstimateLineItem[];
  estimateId: string;
};

function DisplayLineItems({ lineItems, estimateId }: Props) {
  const columns: ColumnDef<EstimateLineItem>[] = [
    {
      header: "Item",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-main-blue font-medium  capitalize">
            {row.original.title}
          </span>
        );
      },
    },
    {
      header: "Qty",
      accessorKey: "quantity",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-main-blue   capitalize">
            {row.original.quantity}
          </span>
        );
      },
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-main-blue   capitalize">
            {row.original.category}
          </span>
        );
      },
    },
    {
      header: "Unit",
      accessorKey: "unitType",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-main-blue   capitalize">
            {row.original.unitType.toString().replace("_", " ")}
          </span>
        );
      },
    },
    {
      header: "Cost",
      accessorKey: "cost",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-main-blue  capitalize">
            {formatCurrency(row.original.cost)}
          </span>
        );
      },
    },
    {
      id: "total",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue font-medium  capitalize">
            {formatCurrency(row.original.itemTotal)}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: lineItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex-1 flex-col gap-2 flex">
      <div className="w-full max-h-[50vh] flex-1 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-orange scrollbar-track-dark-orange/20 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "py-1 rounded-none text-main-blue  font-medium",
                        header.column.id === "title" &&
                          "bg-white sticky   left-0 z-10 w-max before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        header.column.id === "total" &&
                          "bg-white sticky    right-0 z-10 w-max before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b group hover:bg-transparent"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-2.5s ",
                        cell.column.id === "title" &&
                          "sticky bg-white    left-0 z-10 w-max before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        cell.column.id === "total" &&
                          "bg-white sticky    right-0 z-10 w-max before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="min-h-full">
                  <p>No Line Items Found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default DisplayLineItems;
