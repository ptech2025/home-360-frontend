import { API_URL } from "@/utils/constants";
import axios from "axios";

import { Estimate } from "@/types/estimate";
import { EstimateLineItemType } from "@/types/zod-schemas";

export const fetchEstimateById = async (id: string | undefined) => {
  if (!id) return null;
  try {
    const res = await axios.get(`${API_URL}/api/estimate/${id}`, {
      withCredentials: true,
    });
    const estimate: Estimate = res.data;
    return estimate;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchEstimatePdf = async (id: string) => {
  try {
    const res = await axios.get(
      `${API_URL}/api/estimate/convert-to-pdf/${id}`,
      {
        withCredentials: true,
        responseType: "arraybuffer",
      }
    );

    return res.data as ArrayBuffer;
  } catch (err) {
    console.error("Failed to fetch PDF:", err);
    return null;
  }
};

export const saveEstimateToProject = async (
  estimateId: string,
  projectId: string
) => {
  return await axios.patch(
    `${API_URL}/api/estimate/add-to-project/${estimateId}/${projectId}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const removeEstimateFromProject = async (
  estimateId: string,
  projectId: string
) => {
  return await axios.patch(
    `${API_URL}/api/project/estimate/${estimateId}/${projectId}`,
    {},
    {
      withCredentials: true,
    }
  );
};
export const updateEstimateTitle = async (
  estimateId: string,
  title: string
) => {
  return await axios.patch(
    `${API_URL}/api/estimate//${estimateId}/title`,
    { title },
    {
      withCredentials: true,
    }
  );
};

export const shareEstimateToClient = async (
  projectId: string,
  estimateId: string
) => {
  return await axios.post(
    `${API_URL}/api/project/share-estimate/${projectId}/${estimateId}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const addLineItemToEstimate = async (
  estimateId: string,
  lineItem: EstimateLineItemType
) => {
  return await axios.post(
    `${API_URL}/api/estimate/${estimateId}/line-items`,
    {
      ...lineItem,
      name: lineItem.title,
    },
    {
      withCredentials: true,
    }
  );
};

export const updateLineItem = async (
  lineItemId: string,
  estimateId: string,
  lineItem: EstimateLineItemType
) => {
  return await axios.patch(
    `${API_URL}/api/estimate/${estimateId}/line-items/${lineItemId}`,
    lineItem,
    {
      withCredentials: true,
    }
  );
};
