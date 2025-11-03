import { api, withAuthHeaders } from "@/lib/axios-client";
import { FetchAllDocumentsResponse, FetchDocumentParams } from "@/types";
import { Document } from "@/types/prisma-schema-types";
import { CreateDocumentSchemaType } from "@/types/zod-schemas";

export const documentService = {
  createDocument: async (homeId: string, data: CreateDocumentSchemaType) => {
    const formData = new FormData();
    if (data.file) {
      formData.append("file", data.file);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "file" && value !== undefined && value !== null) {
        if (typeof value === "object" || Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return await api.post(`/api/document/create/${homeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateDocument: async (docId: string, data: CreateDocumentSchemaType) => {
    const formData = new FormData();
    if (data.file) {
      formData.append("file", data.file);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "file" && value !== undefined && value !== null) {
        if (typeof value === "object" || Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return await api.patch(`/api/document/${docId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getSingleDocument: async (
    homeId: string,
    docId: string,
    cookies?: string
  ) => {
    const res = await api.get(
      `/api/document/single/${docId}/${homeId}`,
      withAuthHeaders(cookies)
    );
    return res.data as Document;
  },

  deleteDocument: async (docId: string, homeId: string) => {
    await api.delete(`/api/document/${docId}/${homeId}`);
  },
  downloadDocument: async (homeId: string, docId: string) => {
    const res = await api.get(`/api/document/download/${docId}/${homeId}`, {
      responseType: "arraybuffer",
    });
    return res.data as ArrayBuffer;
  },

  getDocuments: async (
    homeId: string,
    params: FetchDocumentParams,
    cookies?: string
  ) => {
    const res = await api.get(`/api/document/all/${homeId}`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as FetchAllDocumentsResponse;
  },
};
