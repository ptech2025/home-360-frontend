import { Document } from "@/types/prisma-schema-types";
import DocumentEmpty from "./DocumentEmpty";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { renderDocumentCategoryStyle } from "@/utils/funcs";
import DocumentActions from "./DocumentActions";

type DocumentGridWrapperProps = {
  documents: Document[];
};

function DocumentGridWrapper({ documents }: DocumentGridWrapperProps) {
  if (documents.length === 0) return <DocumentEmpty />;
  return (
    <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      {documents.map((document) => (
        <div
          key={document.id}
          className="rounded-xl w-full flex flex-col gap-2 p-4 border border-lighter-gray"
        >
          <div className="flex justify-between items-center w-full">
            <h5 className="text-black text-xl font-circular-bold">
              {document.title}
            </h5>
            <DocumentActions doc={document} />
          </div>

          <Badge
            className={cn(
              "capitalize font-medium font-circular-medium",
              renderDocumentCategoryStyle(document.category)
            )}
          >
            {document.category.replace("_", " ")}
          </Badge>

          <div className="flex flex-wrap w-full gap-2">
            {document.tags.map((tag) => (
              <div
                key={tag}
                className="px-2 py-1 h-auto w-max rounded-md bg-white transition-colors hover:bg-main-green text-black hover:text-white border border-light-gray hover:border-white text-sm font-medium font-circular-medium"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center pt-2 border-t border-lighter-gray">
            <span className="text-sm font-circular-light text-black">
              {format(new Date(document.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default DocumentGridWrapper;
