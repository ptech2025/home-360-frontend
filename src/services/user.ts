import { API_URL } from "@/utils/constants";
import axios from "axios";

export const saveUserLocation = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  return await axios.put(
    `${API_URL}/api/user/location`,
    { lat, lng },
    {
      withCredentials: true,
    }
  );
};
