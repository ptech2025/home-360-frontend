"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../global/DataTable";
import { MaintenanceInstance } from "@/types/prisma-schema-types";
import DisplayTaskStatus from "./DisplayTaskStatus";
import { Badge } from "../ui/badge";
import { TaskActions } from "./TaskDialogs";
import TasksEmpty from "./TasksEmpty";
import { PermissionResult } from "@/utils/funcs";

type Props = {
  tasks: MaintenanceInstance[];
  isCustom?: boolean;
  hasCreateTaskPermission: PermissionResult;
};

function TasksTable({ tasks, isCustom, hasCreateTaskPermission }: Props) {
  const columns: ColumnDef<MaintenanceInstance>[] = [
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
        return <DisplayTaskStatus status={row.original.status} />;
      },
    },
    {
      accessorKey: "category",
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Category
        </span>
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm text-black   capitalize  ">
            {row.original.category.replace("_", " ")}
          </span>
        );
      },
    },
    {
      accessorKey: "frequency",
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Frequency
        </span>
      ),
      cell: ({ row }) => {
        return (
          <Badge className="text-xs justify-center flex text-center text-black font-circular-medium border border-light-gray bg-white   capitalize  ">
            <span className="text-xs">
              {row.original.frequency.replace("_", " ")}
            </span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: () => (
        <span className="text-sm text-black font-medium font-circular-medium">
          Due Date
        </span>
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm text-black   capitalize">
            {formatDate(row.original.dueDate, "MM/dd/yyyy")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return <TaskActions data={row.original} />;
      },
    },
  ];
  return (
    <DataTable columns={columns} data={tasks}>
      <TasksEmpty isCustom={isCustom} hasCreateTaskPermission={hasCreateTaskPermission} />
    </DataTable>
  );
}

export default TasksTable;
