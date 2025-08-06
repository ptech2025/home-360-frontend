import axios from "axios";

const createAxios = (cookie?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: cookie ? { Cookie: cookie } : {},
  });
};

export default createAxios;
