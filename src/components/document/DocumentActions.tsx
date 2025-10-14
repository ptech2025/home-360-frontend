import { Document } from "@/types/prisma-schema-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  AddOrEditDocumentDialog,
  DeleteDocumentDialog,
} from "./DocumentDialogs";
import { DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  doc: Document;
};

function DocumentActions({ doc }: Props) {
  const [open, setOpen] = useState(false);

  const handleDownloadDocument = () => {
    const fileUrl = doc.fileUrl.endsWith("pdf")
      ? doc.fileUrl.replace("/upload/", "/upload/fl_attachment/")
      : doc.fileUrl;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = doc.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Document downloaded successfully.");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="size-9 flex items-center justify-center shrink-0 text-black hover:text-main-green">
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleDownloadDocument}
        >
          Download
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AddOrEditDocumentDialog type="update" data={doc}>
            <DialogTrigger className="cursor-pointer text-start w-full">
              Edit
            </DialogTrigger>
          </AddOrEditDocumentDialog>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DeleteDocumentDialog docId={doc.id}>
            <DialogTrigger className="cursor-pointer text-start text-red-500 w-full">
              Delete
            </DialogTrigger>
          </DeleteDocumentDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DocumentActions;
