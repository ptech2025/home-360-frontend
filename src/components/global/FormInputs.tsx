"use client";
import "intl-tel-input/styles";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { TagsInput } from "../ui/tags-input";

const IntlTelInput = dynamic(() => import("intl-tel-input/reactWithUtils"), {
  ssr: false,
  loading: () => <Skeleton className="h-11 w-full" />,
});

export function PhoneInput({
  className,
  setPhoneNumber,
}: {
  className: string;
  setPhoneNumber: (value: string) => void;
}) {
  return (
    <div className={className}>
      <IntlTelInput
        onChangeNumber={setPhoneNumber}
        initOptions={{
          initialCountry: "us",
          onlyCountries: ["us"],
          formatOnDisplay: true,
          allowDropdown: false,
          formatAsYouType: true,
          showFlags: true,
          strictMode: true,
          separateDialCode: true,
        }}
      />
    </div>
  );
}

export function UploadCompanyLogoInput({
  setLogo,
  logo,
}: {
  setLogo: (logo: File) => void;
  logo: File | undefined;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const filesArray = Array.from(e.dataTransfer.files);
    if (filesArray.length > 0) {
      setLogo(filesArray[0]);
    }
  };
  return (
    <Label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor="companyLogo"
      className="flex flex-col rounded-md hover:border-ring hover:ring-ring/50 hover:ring-[3px] gap-4 items-center h-[8.5rem] border border-input justify-center w-full cursor-pointer"
    >
      {logo ? (
        <div className="w-full font-medium font-dm h-full flex items-center justify-center">
          <Image
            alt="company logo"
            width={100}
            height={100}
            src={URL.createObjectURL(logo)}
            className="aspect-square object-cover"
          />
        </div>
      ) : isDragging ? (
        <span className="text-dark-orange text-sm">Drop here</span>
      ) : (
        <>
          <div className="rounded-md size-10 p-1 justify-center items-center flex border border-input ">
            <CloudUpload className="size-5 text-main-blue/80" />
          </div>
          <p className="text-main-blue/80 text-sm">
            <span className="text-dark-orange">Choose file</span>{" "}
            <span>Or drag and drop</span>
          </p>
        </>
      )}

      <Input
        hidden
        id="companyLogo"
        name="companyLogo"
        accept="image/*"
        type="file"
        onChange={(e) => {
          const fileArray = e.target.files;
          if (fileArray) {
            const file = Array.from(fileArray)[0];
            setLogo(file);
          }
        }}
      />
    </Label>
  );
}

