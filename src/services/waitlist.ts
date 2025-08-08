import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { API_URL } from "@/utils/constants";
import axios from "axios";

export const fetchWaitListCount = async () => {
  try {
    const res: { data: { count: number } } = await axios.get(
      `${API_URL}/api/waitlist`
    );
    console.log(res);
    return res.data.count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
export const saveToWaitList = async (data: {
  email: string;
  jobTitle?: string;
}) => {
  await axios.post(`${API_URL}/api/waitlist`, data);
};
