
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document, DocumentCategory } from "@/types/prisma-schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createDocumentSchema,
  CreateDocumentSchemaType,
} from "@/types/zod-schemas";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TagsInput } from "../ui/tags-input";
import { sampleTags } from "@/utils/options";
import FileInput from "./FileInput";
import { useMutation } from "@tanstack/react-query";
import { documentMutations } from "@/queries/document";
import { useState } from "react";

type AddOrEditDocumentDialogProps = {
  type: "create" | "update";
  data?: Document;
  children: React.ReactNode;
};

type DeleteDocumentDialogProps = {
  docId: string;
  children: React.ReactNode;
};

export function AddOrEditDocumentDialog({
  children,
  data,
  type,
}: AddOrEditDocumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { homeId, category } = useParams<{
    homeId: string;
    category?: string;
  }>();

  const defaultCat = category
    ? (category as DocumentCategory)
    : DocumentCategory.other;
  const form = useForm<CreateDocumentSchemaType>({
    resolver: zodResolver(createDocumentSchema(type)),
    mode: "onChange",
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      category: type === "create" ? defaultCat : data?.category,
      tags: data?.tags || [],
      file: undefined,
    },
  });

  const { mutate: createDocument, isPending: isCreating } = useMutation({
    mutationFn: documentMutations.create,
    onSuccess: () => {
      form.reset();
      toast.success("Document uploaded successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-documents", homeId, {}],
      });
      context.client.invalidateQueries({
        queryKey: ["single-home", homeId],
      });
    },
  });
  const { mutate: updateDocument, isPending: isUpdating } = useMutation({
    mutationFn: documentMutations.update,
    onSuccess: () => {
      toast.success("Document updated successfully.");
      setIsOpen(false);
    },
    onSettled(_data, _error, vars, _result, context) {
      context.client.invalidateQueries({
        queryKey: ["single-document", homeId, vars.docId],
      });
      context.client.invalidateQueries({
        queryKey: ["all-documents", homeId, {}],
      });
      context.client.invalidateQueries({
        queryKey: ["single-home", homeId],
      });
    },
  });

  const onSubmit = (values: CreateDocumentSchemaType) => {
    if (type === "create") {
      createDocument({
        homeId,
        data: {
          ...values,
          tags: [
            ...new Set(values.tags.map((tag) => tag.trim().toLowerCase())),
          ],
        },
      });
    } else if (type === "update" && data) {
      updateDocument({
        homeId,
        docId: data.id,
        data: {
          ...values,
          tags: [
            ...new Set(values.tags.map((tag) => tag.trim().toLowerCase())),
          ],
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            {type === "create" ? "Upload New Document" : "Update Document"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Add and organize important home documents here."
              : "Make changes to your document details or replace the existing file."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="document-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1   justify-center  flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl>
                      <FileInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Only support pdf, .docx files (max 5 MB)
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Document Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter document title"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
                            className="w-full capitalize h-10!"
                          >
                            <SelectValue
                              placeholder="Select"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(DocumentCategory).map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                                className="capitalize"
                              >
                                {cat.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Document Description{" "}
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter document description"
                        className=" max-h-[6rem] resize-none scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Tags
                    </FormLabel>
                    <FormDescription>
                      Press <strong>Enter</strong> after typing to add a tag.
                    </FormDescription>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Enter tags"
                        className="w-full max-h-[6rem] overflow-y-auto! scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <div className="flex flex-col gap-2">
                <span className="font-circular-medium text-sm text-black">
                  Suggested tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleTags.map((tag) => (
                    <Button
                      type="button"
                      key={tag}
                      variant="outline"
                      onClick={() => {
                        form.setValue(
                          "tags",
                          [...form.getValues("tags"), tag],
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      className="text-xs text-black w-max py-1 px-2 h-auto rounded-sm font-circular-medium "
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            onClick={() => form.reset()}
            disabled={isCreating || isUpdating}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="document-form"
            className="text-white text-base min-w-[90px] grid grid-cols-1 grid-rows-1 place-items-center bg-main-green border border-transparent h-11 rounded-md px-4  transition-colors"
            disabled={isCreating || isUpdating}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isCreating || isUpdating ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full",
                isCreating || isUpdating ? "invisible" : "visible"
              )}
            >
              {type === "create" ? "Upload" : "Save"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteDocumentDialog({
  children,
  docId,
}: DeleteDocumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { homeId } = useParams<{
    homeId: string;
    category?: string;
  }>();

  const { mutate: deleteDoc, isPending } = useMutation({
    mutationFn: documentMutations.delete,
    onSuccess: () => {
      toast.success("Document deleted successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-documents", homeId, {}],
      });
      context.client.invalidateQueries({
        queryKey: ["single-home", homeId],
      });
    },
  });

  const handleDelete = () => {
    deleteDoc({ docId, homeId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Confirm Document Deletion
          </DialogTitle>
          <DialogDescription>
            This action will permanently remove the selected document. Are you
            sure you want to continue?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="button"
            onClick={handleDelete}
            className="text-white min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center bg-red-500 border border-transparent h-11 rounded-md px-4  transition-colors"
            disabled={isPending}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isPending ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full",
                isPending ? "invisible" : "visible"
              )}
            >
              Delete
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
