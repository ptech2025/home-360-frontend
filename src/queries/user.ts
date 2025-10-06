// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { userService } from "@/services/user";

export const userQueries = {
  all: () => queryResult(["users"], () => userService.getAll()),

  detail: (id: string) =>
    queryResult(["users", id], () => userService.getById(id)),

  // 🔑 server-only variants
  withCookies: (cookies: string) => ({
    all: () => queryResult(["users"], () => userService.getAll(cookies)),
    detail: (id: string) =>
      queryResult(["users", id], () => userService.getById(id, cookies)),
  }),
};

export const userMutations = {
  addToWaitList: mutationResult((variables: { email: string }) =>
    userService.saveToWaitList(variables)
  ),

  // server-only variant
  withCookies: (cookies: string) => ({}),
};
