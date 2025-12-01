import { SubscriptionPlan } from "@/types/prisma-schema-types";
import { api, withAuthHeaders } from "@/lib/axios-client";

export const subscriptionService = {
  fetchPlans: async (): Promise<SubscriptionPlan[]> => {
    const res = await api.get(`/api/subscription/plans`, {
      withCredentials: true,
    });
    return res.data as SubscriptionPlan[];
  },
  subscribeToPlan: async (planId: string, cookies?: string) => {
    const res = await api.post(
      `/api/subscription/checkout/${planId}`,

      withAuthHeaders(cookies)
    );
    return res.data.url as string;
  },
  changePlan: async (planId: string, cookies?: string) => {
    const res = await api.post(
      `/api/subscription/change-plan/${planId}`,
      withAuthHeaders(cookies)
    );
    return res.data.url as string;
  },
  cancelSubscription: async (planId: string, cookies?: string) => {
    const res = await api.patch(
      `/api/subscription/cancel/${planId}`,
      withAuthHeaders(cookies)
    );
    return res.data.url as string;
  },
};
