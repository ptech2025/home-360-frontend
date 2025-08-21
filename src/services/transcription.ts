import { API_URL } from "@/utils/constants";

import axios from "axios";

export const transcribeRecording = async (blob: Blob, transcriptId: string) => {
  const formData = new FormData();
  formData.append("file", blob, "recording.webm");

  return await axios.post(`${API_URL}/api/transcribe/${transcriptId}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



