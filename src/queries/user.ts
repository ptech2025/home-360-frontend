// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { userService } from "@/services/user";
import { FetchLocationParams, FetchPlacesParams } from "@/types";
import {
  PersonalInfoSchemaType,
  UpdateHomeDetailsSchemaType,
} from "@/types/zod-schemas";

export const userQueries = {
  fetchPlaces: (params: FetchPlacesParams) =>
    queryResult(["places", params], () => userService.fetchPlaces(params)),
  fetchLocation: (params: FetchLocationParams) =>
    queryResult(["location", params], () => userService.fetchLocation(params)),
  singleHome: (id: string) =>
    queryResult(["single-home", id], () => userService.getHome(id)),
  allHomes: () => queryResult(["all-homes"], () => userService.getHomes()),

  withCookies: (cookies: string) => ({
    singleHome: (id: string) =>
      queryResult(["single-home", id], () => userService.getHome(id, cookies)),
    allHomes: () =>
      queryResult(["all-homes"], () => userService.getHomes(cookies)),
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
  addHome: mutationResult((variables: { address: string }) =>
    userService.createHome(variables)
  ),
  updateHome: mutationResult((variables: { address: string; homeId: string }) =>
    userService.updateHome(variables)
  ),
  updateHomeDetails: mutationResult(
    (variables: { homeId: string; data: UpdateHomeDetailsSchemaType }) =>
      userService.updateHomeDetails(variables.homeId, variables.data)
  ),
  updateProfile: mutationResult((variables: PersonalInfoSchemaType) =>
    userService.updateProfile(variables)
  ),

  // server-only variant
};
