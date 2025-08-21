import { API_URL } from "@/utils/constants";
import axios from "axios";

import { Estimate } from "@/types/estimate";

export const fetchEstimateById = async (id: string | undefined) => {
  if (!id) return null;
  try {
    const res = await axios.get(`${API_URL}/api/estimate/${id}`, {
      withCredentials: true,
    });
    const estimate: Estimate = res.data;
    return estimate;
  } catch (err) {
    return null;
  }
};
