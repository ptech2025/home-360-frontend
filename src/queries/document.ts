// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { documentService } from "@/services/document";
import { FetchDocumentParams } from "@/types";
import { CreateDocumentSchemaType } from "@/types/zod-schemas";
export const documentQueries = {
  singleDoc: (homeId: string, docId: string) =>
    queryResult(["single-document", homeId, docId], () =>
      documentService.getSingleDocument(homeId, docId)
    ),
  all: (homeId: string, params: FetchDocumentParams) =>
    queryResult(["all-documents", homeId, params], () =>
      documentService.getDocuments(homeId, params)
    ),
  withCookies: (cookies: string) => ({
    all: (homeId: string, params: FetchDocumentParams) =>
      queryResult(["all-documents", homeId, params], () =>
        documentService.getDocuments(homeId, params, cookies)
      ),
    singleDoc: (homeId: string, docId: string) =>
      queryResult(["single-document", docId], () =>
        documentService.getSingleDocument(homeId, docId, cookies)
      ),
  }),
};

export const documentMutations = {
  create: mutationResult(
    (variables: { homeId: string; data: CreateDocumentSchemaType }) =>
      documentService.createDocument(variables.homeId, variables.data)
  ),
  update: mutationResult(
    (variables: { docId: string; data: CreateDocumentSchemaType }) =>
      documentService.updateDocument(variables.docId, variables.data)
  ),
  delete: mutationResult((variables: { docId: string; homeId: string }) =>
    documentService.deleteDocument(variables.docId, variables.homeId)
  ),
  download: mutationResult((variables: { docId: string; homeId: string }) =>
    documentService.downloadDocument(variables.homeId, variables.docId)
  ),
  withCookies: (cookies: string) => ({}),
};
