import { Estimate, EstimateLineItem } from "@/types/estimate";
import { formatCurrency } from "@/utils/funcs";
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
import {
  EstimateAction,
  EstimateTableItemAction,
} from "./EstimateDropdownMenus";
import { Button } from "../ui/button";
import { formatEstimateId } from "@/utils/funcs";
import SavedToProjectDropdownMenu from "./SavedToProjectDropdownMenu";
import { FolderEdit } from "lucide-react";
import Link from "next/link";
import {
  AddLineItemDialog,
  UpdateEstimateDiscountDialog,
  UpdateEstimateTaxDialog,
} from "./EstimateDialogs";

type Props = {
  estimate: Estimate;
};

type DisplayEstimateLineItemsProps = {
  lineItems: EstimateLineItem[];
  projectId: string | null;
  estimateId: string;
};

type EstimatePreviewLineItemsProps = {
  estimate: Estimate;
};

export function DisplayEstimateTotal({ estimate }: Props) {
  return (
    <div className="pr-4 py-4 ">
      <div className="p-2 grid-cols-1 grid gap-1 bg-main-blue/5 rounded-md">
        {/* //Subtotal */}
        <div className="flex  justify-between items-center">
          <span className="text-dark-orange text-sm">Subtotal</span>
          <span className="text-base md:text-lg lg:text-xl font-bold text-dark-orange shrink-0">
            {formatCurrency(estimate.calculations.subTotal)}
          </span>
        </div>{" "}
        {/* //Tax, Markup & Discount */}
        <div className="grid grid-cols-1 gap-0.5">
          <div className="flex  justify-between items-center">
            <span className="text-main-blue text-xs">
              {estimate.estimateDiscount.name} ({estimate.estimateDiscount.rate}
              %)
            </span>
            <span className="text-sm font-semibold">
              - {formatCurrency(estimate.calculations.discountValue)}
            </span>
          </div>
          <div className="flex  justify-between items-center">
            <span className="text-main-blue text-xs">
              Tax ({estimate.estimateTax.rate}%)
            </span>
            <span className="text-sm font-semibold">
              {formatCurrency(estimate.calculations.taxValue)}
            </span>
          </div>
        </div>
        {/* //Overall Total */}
        <div className="flex justify-between items-center">
          <span className="text-dark-orange text-sm">Total</span>
          <span className="text-lg md:text-xl lg:text-2xl font-bold text-dark-orange shrink-0">
            {formatCurrency(estimate.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DisplayEstimateLineItems({
  lineItems,
}: DisplayEstimateLineItemsProps) {
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
              <TableRow
                key={headerGroup.id}
                className="border-b hover:bg-transparent "
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "py-1 rounded-none   font-normal text-[#929496] text-base  ",
                        header.column.id === "title" &&
                          "bg-white sticky  lg:before:hidden lg:after:hidden left-0 z-10 w-max before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        header.column.id === "total" &&
                          "bg-white sticky  lg:before:hidden lg:after:hidden  right-0 z-10 w-max before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
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
                        "py-2.5 ",
                        cell.column.id === "title" &&
                          "sticky bg-white  lg:before:hidden lg:after:hidden  left-0 z-10 w-max before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        cell.column.id === "total" &&
                          "bg-white sticky  lg:before:hidden lg:after:hidden  right-0 z-10 w-max before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
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

export function DisplayEstimateHeader({ estimate }: Props) {
  const { id, title, projectId } = estimate;
  return (
    <div className="flex justify-between items-center gap-4 pr-4 pb-4">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-sm text-dark-orange">{formatEstimateId(id)}</span>
        <h4 className="text-main-blue text-base lg:text-lg font-semibold">
          {title}
        </h4>
      </div>
      {projectId ? (
        <Button
          asChild
          className="h-10 text-white bg-main-blue rounded-4xl w-max hover:bg-main-blue/10 hover:text-main-blue border hover:border-main-blue border-transparent"
        >
          <Link href={`/dashboard/estimates/${id}`}>
            <FolderEdit className="size-4" />
            <span className="hidden md:inline-block">Edit Estimate</span>
          </Link>
        </Button>
      ) : (
        <SavedToProjectDropdownMenu estimateId={id} />
      )}
    </div>
  );
}

export function DisplayEstimatePageHeader({ estimate }: Props) {
  const { id, title, projectId } = estimate;
  return (
    <div className="flex justify-between items-center gap-4 pr-4 pb-4">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-sm text-dark-orange">{formatEstimateId(id)}</span>
        <h4 className="text-main-blue text-base lg:text-lg font-semibold">
          {title}
        </h4>
      </div>
      {projectId ? (
        <EstimateAction estimate={estimate} />
      ) : (
        <SavedToProjectDropdownMenu estimateId={id} />
      )}
    </div>
  );
}

export function DisplayEstimatePageTotal({ estimate }: Props) {
  return (
    <div className="pr-4 py-4 ">
      <div className="p-2 grid-cols-1 grid gap-1 bg-main-blue/5 rounded-md">
        {/* //Subtotal */}
        <div className="flex  justify-between items-center">
          <span className="text-dark-orange text-sm">Subtotal</span>
          <span className="text-base md:text-lg lg:text-xl font-bold text-dark-orange shrink-0">
            {formatCurrency(estimate.calculations.subTotal)}
          </span>
        </div>{" "}
        {/* //Tax, Markup & Discount */}
        <div className="grid grid-cols-1 gap-0.5">
          <div className="flex  justify-between items-center">
            <span className="text-main-blue text-xs">
              {estimate.estimateDiscount.name} ({estimate.estimateDiscount.rate}
              %)
            </span>
            <span className="text-sm font-semibold">
              {estimate.projectId ? (
                <UpdateEstimateDiscountDialog estimate={estimate} />
              ) : (
                -formatCurrency(estimate.calculations.discountValue)
              )}
            </span>
          </div>
          <div className="flex  justify-between items-center">
            <span className="text-main-blue text-xs">
              {estimate.estimateTax.name} ({estimate.estimateTax.rate}%)
            </span>
            <span className="text-sm font-semibold">
              {estimate.projectId ? (
                <UpdateEstimateTaxDialog estimate={estimate} />
              ) : (
                formatCurrency(estimate.calculations.taxValue)
              )}
            </span>
          </div>
        </div>
        {/* //Overall Total */}
        <div className="flex justify-between items-center">
          <span className="text-dark-orange text-sm">Total</span>
          <span className="text-lg md:text-xl lg:text-2xl font-bold text-dark-orange shrink-0">
            {formatCurrency(estimate.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DisplayEstimatePageLineItems({
  lineItems,
  projectId,
  estimateId,
}: DisplayEstimateLineItemsProps) {
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
          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm text-main-blue font-medium  capitalize">
              {formatCurrency(row.original.itemTotal)}
            </span>

            {projectId && (
              <EstimateTableItemAction
                estimateId={estimateId}
                lineItem={row.original}
              />
            )}
          </div>
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
      {projectId && <AddLineItemDialog estimateId={estimateId} />}
      <div className="w-full max-h-[50vh] flex-1 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-orange scrollbar-track-dark-orange/20 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "py-1 rounded-none text-main-blue  font-medium",
                        header.column.id === "title" &&
                          "bg-white sticky   left-0 z-10 w-max lg:before:hidden lg:after:hidden before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        header.column.id === "total" &&
                          "bg-white sticky    right-0 z-10 w-max lg:before:hidden lg:after:hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
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
                        "py-2.5 ",
                        cell.column.id === "title" &&
                          "sticky bg-white    left-0 z-10 w-max lg:before:hidden lg:after:hidden before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:right-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]",
                        cell.column.id === "total" &&
                          "bg-white sticky    right-0 z-10 w-max lg:before:hidden lg:after:hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-sidebar-border after:absolute after:left-[-24px] after:top-0 after:bottom-0 after:w-6   after:z-[-1]"
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

export function EstimatePreviewLineItems({
  estimate,
}: EstimatePreviewLineItemsProps) {
  const columns: ColumnDef<EstimateLineItem>[] = [
    {
      header: "Item Description",
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
      header: "Amount",
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
      header: "Total",
      accessorKey: "itemTotal",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue capitalize">
            {formatCurrency(row.original.itemTotal)}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: estimate.lineItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full  flex-1 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-orange scrollbar-track-dark-orange/20 ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent border-none"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "py-1 rounded-none text-main-blue  font-medium"
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
                className=" border-none group hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("py-2.5 ")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      <div className="ml-auto grid grid-cols-0.5 p-6 rounded-b-md bg-main-blue/10 max-w-[25rem]">
        <div className="flex  justify-between items-center">
          <span className="text-main-blue text-xs">Subtotal</span>
          <span className="text-sm">{formatCurrency(estimate.subTotal)}</span>
        </div>
        <div className="flex  justify-between items-center">
          <span className="text-main-blue text-xs">
            {estimate.estimateDiscount.name}
          </span>
          <span className="text-sm">{estimate.estimateDiscount.rate}%</span>
        </div>
        <div className="flex  justify-between items-center">
          <span className="text-main-blue text-xs">
            {estimate.estimateTax.name}
          </span>
          <span className="text-sm ">{estimate.estimateTax.rate}%</span>
        </div>
        <div className="flex  justify-between items-center">
          <span className="text-main-blue text-xs">
            Total ( <strong>USD</strong> )
          </span>
          <span className="text-sm font-bold">
            {formatCurrency(estimate.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
