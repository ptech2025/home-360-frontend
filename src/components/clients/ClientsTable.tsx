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
import Link from "next/link";

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
          <Link href={`/dashboard/clients/${row.original.id}`} className="text-sm hover:underline text-main-blue font-medium  capitalize">
            {row.original.name}
          </Link>
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
      header: "",
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
    <div className="w-full    overflow-y-auto">
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
                  <TableCell key={cell.id} className={cn(" py-3 px-6 ")}>
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
