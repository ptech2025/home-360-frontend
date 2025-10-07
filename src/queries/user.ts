// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { userService } from "@/services/user";

export const userQueries = {
  singleHome: (id: string) =>
    queryResult(["single-home", id], () => userService.getHome(id)),

  withCookies: (cookies: string) => ({
    singleHome: (id: string) =>
      queryResult(["single-home", id], () => userService.getHome(id, cookies)),
  }),
};

export const userMutations = {
  addToWaitList: mutationResult((variables: { email: string }) =>
    userService.saveToWaitList(variables)
  ),
  removeFromWaitList: mutationResult((email: string) =>
    userService.unSubscribeFromWaitList(email)
  ),
  triggerOnboarding: mutationResult(() => userService.onboarded()),
  addHome: mutationResult((address: string) => userService.createHome(address)),

  // server-only variant
  withCookies: (cookies: string) => ({}),
};
