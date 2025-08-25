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
import ProjectsEmpty from "./ProjectsEmpty";
import { Project } from "@/types/project";
import { format } from "date-fns";
import {
  ClientProjectPopover,
  AssignedClientProjectPopover,
} from "@/components/clients/ClientProjectDropdownMenus";
import DisplayProjectStatus from "./DisplayProjectStatus";
import { ProjectActions } from "./ProjectsDialogs";

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  const columns: ColumnDef<Project>[] = [
    {
      header: "Project Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <span className="text-sm text-main-blue font-medium  capitalize">
            {row.original.title}
          </span>
        );
      },
    },
    {
      header: "Client",
      accessorKey: "client",
      cell: ({ row }) => {
        if (row.original.client) {
          <AssignedClientProjectPopover
            client={row.original.client}
            projectId={row.original.id}
          />;
        }
        return (
          <ClientProjectPopover
            client={row.original.client}
            projectId={row.original.id}
          />
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        return <DisplayProjectStatus status={row.original.status} />;
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
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        return <ProjectActions project={row.original} />;
      },
    },
  ];

  const table = useReactTable({
    data: projects,
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
                <ProjectsEmpty />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
