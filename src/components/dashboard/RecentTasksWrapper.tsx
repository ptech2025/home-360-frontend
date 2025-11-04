"use client";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

import { taskQueries } from "@/queries/task";
import { useQuery } from "@tanstack/react-query";
import TasksTable from "../task/TasksTable";
import { TableLoadingSkeleton } from "../global/Skeletons";
import Link from "next/link";

function RecentTasksWrapper({ homeId }: { homeId: string }) {
  const { data, isLoading } = useQuery(
    taskQueries.allTasks(homeId, { page: 1, size: 5 })
  );

  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      <div className="flex justify-between gap-4 items-center">
        <h5 className="text-lg font-circular-bold font-bold text-black">
          Latest Tasks
        </h5>
        <Button asChild className="green-btn">
          <Link href={`/dashboard/${homeId}/tasks`}>
            <span>View All</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <TasksTable tasks={data?.maintenances ?? []} />
      )}
    </div>
  );
}

export default RecentTasksWrapper;
