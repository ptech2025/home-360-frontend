import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import {AddOrEditDocumentDialog} from "./DocumentDialogs";
import { DialogTrigger } from "../ui/dialog";

function DocumentEmpty() {
  const { category } = useParams<{ homeId: string; category?: string }>();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-lighter-gray text-main-green">
          <FileText />
        </EmptyMedia>
        <EmptyTitle className="font-circular-bold capitalize text-black font-bold">
          No{" "}
          {category ? `${category.replace("_", " ")} Documents` : "Documents"}{" "}
          Found
        </EmptyTitle>
        <EmptyDescription className="text-light-gray">
          You haven’t uploaded any{" "}
          <strong>
            {category ? `${category.replace("_", " ")} documents` : "documents"}
          </strong>{" "}
          yet. Add your first one below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddOrEditDocumentDialog type="create">
          <DialogTrigger className="h-8  flex items-center gap-2  py-2 px-3 rounded-md text-white font-medium text-base bg-main-green hover:bg-white hover:border-main-green hover:text-main-green border border-transparent transition-colors">
            <Plus className="size-4" />
            <span>Upload Document</span>
          </DialogTrigger>
        </AddOrEditDocumentDialog>
      </EmptyContent>
    </Empty>
  );
}
export default DocumentEmpty;
