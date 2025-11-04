// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { taskService } from "@/services/task";
import { FetchHomeTasksParams } from "@/types";
import {
  CreateHomeSchemaType,
  CreateHomeTaskSchemaType,
} from "@/types/zod-schemas";

export const taskQueries = {
  allTasks: (homeId: string, params: FetchHomeTasksParams) =>
    queryResult(["all-tasks", homeId, params], () =>
      taskService.fetchAll(homeId, params)
    ),
  tasks: (homeId: string, date?: string, enabled:boolean) =>
    queryResult(["tasks-events", homeId, date], () =>
      taskService.fetchTaskEvents(homeId, date), {
        enabled
      }
    ),
  reminders: (homeId: string, date?: string, enabled:boolean) =>
    queryResult(["reminders-events", homeId, date], () =>
      taskService.fetchReminderEvents(homeId, date), {
        enabled
      }
    ),
  withCookies: (cookies: string) => ({
    allTasks: (homeId: string, params: FetchHomeTasksParams) =>
      queryResult(["all-tasks", homeId, params], () =>
        taskService.fetchAll(homeId, params, cookies)
      ),

    tasks: (homeId: string, date?: string) =>
      queryResult(["tasks-events", homeId, date], () =>
        taskService.fetchTaskEvents(homeId, date, cookies)
      ),
    reminders: (homeId: string, date?: string) =>
      queryResult(["reminders-events", homeId, date], () =>
        taskService.fetchReminderEvents(homeId, date, cookies)
      ),
  }),
};

export const taskMutations = {
  delete: mutationResult((payload: { taskId: string; homeId: string }) =>
    taskService.delete(payload.homeId, payload.taskId)
  ),
  create: mutationResult(
    (variables: { homeId: string; data: CreateHomeTaskSchemaType }) =>
      taskService.addTask(variables.homeId, variables.data)
  ),
  update: mutationResult(
    (variables: {
      homeId: string;
      taskId: string;
      data: CreateHomeTaskSchemaType;
    }) =>
      taskService.updateTask(variables.homeId, variables.taskId, variables.data)
  ),
  markAsCompleted: mutationResult((payload: { taskId: string }) =>
    taskService.markAsCompleted(payload.taskId)
  ),
};
