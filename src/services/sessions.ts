import { API_URL } from "@/utils/constants";
import {
  CompanyTradeSchemaType,
  OrgInfoSchemaType,
  PricingSchemaType,
} from "@/utils/zod-schemas";
import axios from "axios";

export const createSession = async () => {
  const res = await axios.post(`${API_URL}/api/chat/create-session`);

  const sessionId = res.data.sessionId;

  return sessionId;
};

export const fetchAllChatSession = async () => {
  try {
    const res: { data: { sessions: string[] } } = await axios.get(
      `${API_URL}/api/user/sessions`
    );
    return res.data.sessions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
