import { API_URL } from "@/utils/constants";

import axios from "axios";
import { Subscription } from "@/types";

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const res: { data: Subscription[] } = await axios.get(
      `${API_URL}/api/subscription`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const subscribeToPlan = async (planId: string) => {
  const res = await axios.post(
    `${API_URL}/api/subscription/checkout`,
    { planId },
    {
      withCredentials: true,
    }
  );
  return res.data.url as string;
};

export const changePlan = async (planId: string) => {
  const res = await axios.post(
    `${API_URL}/api/subscription/change-plan`,
    { planId },
    {
      withCredentials: true,
    }
  );
  return res.data.url as string;
};
export const cancelSubscription = async (planId: string) => {
  const res = await axios.post(
    `${API_URL}/api/subscription/cancel`,
    { planId },
    {
      withCredentials: true,
    }
  );
  return res.data.url as string;
};
