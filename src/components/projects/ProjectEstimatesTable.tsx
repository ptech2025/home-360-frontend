"use client";

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

import ProjectEstimatesEmpty from "./ProjectEstimatesEmpty";
import { Estimate } from "@/types/estimate";
import { formatCurrency, formatEstimateId } from "@/utils/funcs";
import { format } from "date-fns";
import { ProjectEstimatesActions } from "./ProjectEstimatesDialogs";

type Props = {
  estimates: Estimate[];
};

export default function ProjectEstimatesTable({ estimates }: Props) {
  const columns: ColumnDef<Estimate>[] = [
    {
      header: "Estimate Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="text-xs text-main-blue  capitalize">
              {formatEstimateId(row.original.id)}
            </span>
            <span className="text-sm text-main-blue font-medium  capitalize">
              {row.original.title}
            </span>
          </div>
        );
      },
    },
    {
      header: "Line Items",
      accessorKey: "lineItems",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue  capitalize">
            {row.original.lineItems.length}
          </span>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return (
          <span className="text-xs">
            {format(row.original.createdAt, "MMM dd, yyyy")}
          </span>
        );
      },
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue font-medium  capitalize">
            {formatCurrency(row.original.totalAmount)}
          </span>
        );
      },
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        return <ProjectEstimatesActions estimate={row.original} />;
      },
    },
  ];

  const table = useReactTable({
    data: estimates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full   overflow-y-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b bg-[#FCFCFD]">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "py-3 px-6 font-normal text-[#929496] text-base    ",
                      header.column.id === "actions" && "w-[50px]"
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
                className="border-b group hover:bg-muted/50 "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("py-3 px-6 ")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="min-h-full">
                <ProjectEstimatesEmpty />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
