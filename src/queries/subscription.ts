import { queryResult, mutationResult } from "@/lib/react-query-config";
import { subscriptionService } from "@/services/subscription";

export const subscriptionQueries = {
  fetchPlans: () =>
    queryResult(["subscription-plans"], () => subscriptionService.fetchPlans()),
};

export const subscriptionMutations = {
  subscribeToPlan: mutationResult((variables: { planId: string }) =>
    subscriptionService.subscribeToPlan(variables.planId)
  ),
  changePlan: mutationResult((variables: { planId: string }) =>
    subscriptionService.changePlan(variables.planId)
  ),
  cancelSubscription: mutationResult((variables: { planId: string }) =>
    subscriptionService.cancelSubscription(variables.planId)
  ),
};
