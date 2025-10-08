"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../global/DataTable";
import { Button } from "../ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  title: string;
  createdAt: Date;
  status: "pending" | "in_progress" | "completed" | "overdue";
}

const tasksData: Task[] = [
  {
    title: "Change HVAC filters",
    createdAt: new Date(),
    status: "pending",
  },
  {
    title: "Clean gutters",
    createdAt: new Date(),
    status: "in_progress",
  },
  {
    title: "Replace roof",
    createdAt: new Date(),
    status: "overdue",
  },
  {
    title: "Upload Warranty",
    createdAt: new Date(),
    status: "completed",
  },
];

export function RecentTasksTable() {
  const columns: ColumnDef<Task>[] = [
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
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Title
        </span>
      ),
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <span className="text-sm hover:underline text-black font-medium font-circular-medium  capitalize">
            {row.original.title}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Status
        </span>
      ),

      cell: ({ row }) => {
        return (
          <Badge
            className={cn("border rounded-xl flex items-center gap-1", {
              "bg-white text-main-green border-main-green":
                row.original.status === "completed",
              "bg-white text-blue-500 border-blue-500":
                row.original.status === "in_progress",
              "bg-destructive/20 text-destructive border-transparent":
                row.original.status === "overdue",
              "bg-white text-gray border-gray":
                row.original.status === "pending",
            })}
          >
            <span className="text-sm  capitalize">
              {row.original.status.replace("_", " ")}
            </span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Date
        </span>
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm text-black   capitalize">
            {formatDate(row.original.createdAt, "MM/dd/yyyy")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <Button
            size={"icon"}
            className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
          >
            <MoreVertical />
          </Button>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      <div className="flex justify-between gap-4 items-center">
        <h5 className="text-lg font-circular-bold font-bold text-black">
          General Maintenance
        </h5>
        <Button
          size={"icon"}
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <Plus />
        </Button>
      </div>
      <DataTable columns={columns} data={tasksData} />
    </div>
  );
}
