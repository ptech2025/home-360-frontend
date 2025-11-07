"use client";

import { FetchHomeTasksParams } from "@/types";
import TasksTable from "./TasksTable";
import { taskQueries } from "@/queries/task";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableLoadingSkeleton } from "../global/Skeletons";
import PaginationContainer from "../global/PaginationContainer";
import { AddOrEditCustomTaskDialog } from "./TaskDialogs";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import SearchBar from "../global/SearchBar";
import UpcomingEventsWrapper from "../dashboard/UpcomingEventsWrapper";

type Props = {
  homeId: string;
  filterParams: FetchHomeTasksParams;
};
function TaskPageWrapper({ homeId, filterParams }: Props) {
  const [instanceType, setInstanceType] = useState<"custom" | "default">(
    "default"
  );
  const { data, isPending } = useQuery(
    taskQueries.allTasks(homeId, { ...filterParams, instanceType })
  );

  const toggleCustom = () => {
    setInstanceType(instanceType === "custom" ? "default" : "custom");
  };

  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50">
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-black text-xl font-circular-medium">
          Maintenance Scheduler & Checklist
        </h3>
        <p className="text-gray text-sm">
          Create and manage maintenance tasks for your property
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[0.3fr_1fr] gap-2">
        <UpcomingEventsWrapper
          type="tasks"
          homeId={homeId}
          orientation="vertical"
          className="min-h-svh bg-white rounded-t-md p-0 w-full justify-center"
          calendarClassName="w-full [--cell-size:--spacing(8.5)] "
        />
        <div className="min-h-svh pt-4 flex flex-col gap-4 bg-white rounded-t-md  w-full">
          <div className="w-full flex px-4 justify-between items-center gap-4">
            <h5 className="text-black text-lg font-circular-medium">
              My Tasks
            </h5>

            <AddOrEditCustomTaskDialog type="create" homeId={homeId}>
              <Button className="text-sm font-circular-medium green-btn gap-2">
                <Plus />
                <span>Add Custom Task</span>
              </Button>
            </AddOrEditCustomTaskDialog>
          </div>
          <div className="flex px-4 justify-between items-center gap-4">
            <Button
              onClick={toggleCustom}
              className="h-10 bg-main-green/10  hover:bg-main-green/10 grid-cols-2 grid gap-0 w-full max-w-[250px]  p-1"
            >
              <div
                data-state={instanceType === "default" ? "active" : "inactive"}
                className="text-center flex items-center justify-center duration-200 text-base font-circular-medium rounded-sm h-full w-full capitalize data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-main-green/50"
              >
                {" "}
                <span>Default</span>
              </div>{" "}
              <div
                data-state={instanceType === "custom" ? "active" : "inactive"}
                className="text-center flex items-center justify-center duration-200 text-base font-circular-medium rounded-sm h-full w-full capitalize data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-main-green/50"
              >
                {" "}
                <span>Custom</span>
              </div>
            </Button>

            <SearchBar
              searchKey="search"
              placeHolder="Search by title"
              className="w-full sm:max-w-xs"
            />
          </div>
          {isPending ? (
            <TableLoadingSkeleton />
          ) : (
            <>
              <TasksTable
                tasks={data?.maintenances ?? []}
                isCustom={instanceType === "custom"}
              />

              <PaginationContainer
                currentPage={filterParams.page || 1}
                totalPages={data?.pagination.totalPages || 1}
                contentTitle="Tasks"
                searchKey="search"
                className="px-4 pb-4"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default TaskPageWrapper;
