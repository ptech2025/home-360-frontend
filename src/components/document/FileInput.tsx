import { useState } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { EmptyMedia, EmptyTitle } from "../ui/empty";
import { formatFileSize } from "@/utils/funcs";

type Props = {
  value: File | undefined;
  onChange: (file: File) => void;
};

function FileInput({ value, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
    }
  };
  return (
    <Label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor="file"
      className={cn("h-30 w-full rounded-md border-dashed border-2", {
        "cursor-dropzone border-main-green": isDragging,
        "cursor-pointer border-light-gray": !isDragging,
        "cursor-pointer border-main-green": value,
      })}
    >
      {value ? (
        <div className="flex justify-center w-full px-4 flex-col items-center h-full gap-2">
          <EmptyMedia
            variant="icon"
            className={cn(
              "bg-white border  ",
              value
                ? "border-main-green text-main-green"
                : "border-light-gray text-light-gray"
            )}
          >
            <CloudUpload />
          </EmptyMedia>
          <EmptyTitle className="font-circular-light text-sm  text-black">
            {value.name} ({formatFileSize(value.size)})
          </EmptyTitle>
        </div>
      ) : (
        <div className="flex justify-center w-full px-4 flex-col items-center h-full gap-2">
          <EmptyMedia
            variant="icon"
            className={cn(
              "bg-white border border-light-gray text-light-gray   "
            )}
          >
            <CloudUpload />
          </EmptyMedia>
          <EmptyTitle className="font-circular-medium text-sm  text-black">
            Drag and drop your file here or click to upload
          </EmptyTitle>
        </div>
      )}

      <input
        type="file"
        id="file"
        hidden
        accept=".pdf,.doc,.docx,.xls,.xlsx,"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
          }
        }}
      />
    </Label>
  );
}
export default FileInput;
