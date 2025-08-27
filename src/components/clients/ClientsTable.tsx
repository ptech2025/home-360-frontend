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

import ClientsEmpty from "./ClientsEmpty";
import { Client } from "@/types/client";
import DisplayPhoneNumber from "../global/DisplayPhoneNumber";
import { MapPin, PhoneIcon } from "lucide-react";
import { ClientsActions } from "./ClientsDialogs";

type Props = {
  clients: Client[];
};

export default function ClientsTable({ clients }: Props) {
  const columns: ColumnDef<Client>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue font-medium  capitalize">
            {row.original.name}
          </span>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => {
        return (
          <span className="text-sm truncate text-main-blue font-medium  ">
            {row.original.email}
          </span>
        );
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
      cell: ({ row }) => {
        return row.original.phone ? (
          <DisplayPhoneNumber
            phoneNumber={row.original.phone}
            className="font-medium"
          />
        ) : (
          <div className="flex text-sm font-medium text-main-blue gap-2 text items-center">
            <PhoneIcon className="size-4 shrink-0 text-main-blue" />
            <span>No Phone Number</span>
          </div>
        );
      },
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: ({ row }) => {
        return row.original.address ? (
          <div className="flex text-sm font-medium text-main-blue gap-2 text items-center">
            <MapPin className="size-4 shrink-0 text-main-blue" />
            <span className="truncate">{row.original.address}</span>
          </div>
        ) : (
          <div className="flex text-sm font-medium text-main-blue gap-2 text items-center">
            <MapPin className="size-4 shrink-0 text-main-blue" />
            <span>No Address</span>
          </div>
        );
      },
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        return <ClientsActions client={row.original} showView={true} />;
      },
    },
  ];

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-lg border   overflow-y-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "py-1  text-main-blue font-semibold   ",
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
                className="border-b group hover:bg-muted/50 last:[&>td:first-child]:rounded-bl-lg last:[&>td:last-child]:rounded-br-lg"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("py-4 ")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="min-h-full">
                <ClientsEmpty />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
