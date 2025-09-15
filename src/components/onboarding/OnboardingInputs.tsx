import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChevronRight, CloudUpload, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { getCurrentLocation } from "@/utils/funcs";
import { validateUserLocation } from "@/services/user";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import Autocomplete from "./Autocomplete";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <div className="w-full font-medium font-circular h-full flex items-center justify-center">
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

export function MarkupPercentInput({
  markupPercent,
  setMarkupPercent,
}: {
  markupPercent: number;
  setMarkupPercent: (num: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 flex-col">
        <p className="text-sm font-medium text-main-blue/80 ">
          Set your default markup percentage. You can always change this per
          estimate.
        </p>
        <span className="text-xs font-medium text-main-blue/80">
          This will not be visible to your clients.
        </span>
      </div>
      <div className="border border-input rounded-lg p-4 gap-5 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-1 items-center justify-center">
          <span className="text-xs font-medium text-main-blue/80">Markup</span>
          <span className="text-xl font-medium text-main-blue">
            {markupPercent} %
          </span>
        </div>

        <Slider
          value={[markupPercent]}
          step={1}
          max={100}
          onValueChange={(value) => {
            setMarkupPercent(value[0]);
          }}
        />

        <Button
          type="button"
          onClick={() => setMarkupPercent(0)}
          className="text-dark-orange"
          variant={"link"}
        >
          Use AI’s Suggested Estimate
        </Button>
      </div>
    </div>
  );
}

export function AutoLocationSelectionInput({
  handleLocationSelect,
  value,
}: {
  handleLocationSelect: (data: {
    address: string;
    mode: "auto" | "manual";
  }) => void;
  value: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAutoSelect = async () => {
    setIsLoading(true);

    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;

      const { address, isInUSA } = await validateUserLocation({
        latitude,
        longitude,
      });
      handleLocationSelect({
        address: isInUSA ? address : "",
        mode: isInUSA ? "manual" : "auto",
      });
      if (!isInUSA) {
        toast.error(
          "sorry, only locations in the USA are currently supported."
        );
        setIsOpen(true);
      }
    } catch (err) {
      console.log(err);
      const msg = renderAxiosOrAuthError(err);

      toast.error(msg);
      handleLocationSelect({
        address: "",
        mode: "manual",
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (value: string) => {
    handleLocationSelect({ address: value, mode: "manual" });
  };

  return (
    <div className="border border-input rounded-lg p-4 gap-5 flex flex-col justify-center items-center">
      <div className="size-10 flex items-center justify-center shrink-0 border border-input rounded-lg p-2">
        <MapPin className="size-5 text-main-blue/80" />
      </div>
      <p className="text-sm text-main-blue/80 text-center">
        Choose your pricing location or enable location access for automatic
        estimates.{" "}
      </p>
      <Button
        type="button"
        className="h-12 w-full hover:bg-main-blue bg-dark-orange"
        onClick={handleAutoSelect}
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <span>Allow location access</span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="h-12 w-full hover:bg-dark-orange/50 bg-dark-orange/10 text-dark-orange border border-dark-orange"
            disabled={isLoading}
            size="lg"
          >
            <span>Choose Manually</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] ">
          <DialogHeader>
            <DialogTitle>Price Location</DialogTitle>
          </DialogHeader>
          <Autocomplete
            handleAutoSelect={handleAutoSelect}
            isAllowAccessLoading={isLoading}
            value={value}
            onChange={onChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ManualLocationSelectionInput({
  handleLocationSelect,
  value,
}: {
  value: string;
  handleLocationSelect: (data: {
    address: string;
    mode: "auto" | "manual";
  }) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAutoSelect = async () => {
    setIsLoading(true);

    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;

      const { address, isInUSA } = await validateUserLocation({
        latitude,
        longitude,
      });
      handleLocationSelect({
        address: address,
        mode: "manual",
      });
      if (!isInUSA) {
        toast.error(
          "sorry, only locations in the USA are currently supported."
        );
      }
    } catch (err) {
      console.log(err);
      const msg = renderAxiosOrAuthError(err);

      toast.error(msg);
      handleLocationSelect({
        address: "",
        mode: "manual",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (address: string) => {
    handleLocationSelect({
      address,
      mode: "manual",
    });
  };

  return (
    <div className="w-full flex-col gap-6 flex">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="h-20 group justify-between w-full text-lg font-medium rounded-2xl hover:bg-main-blue/10 bg-transparent  text-main-blue/80 border border-input"
            disabled={isLoading}
            size="lg"
          >
            <div className="inline-flex gap-2 items-center">
              <div className="size-10 flex items-center justify-center shrink-0 border border-inherit group-hover:border-input rounded-lg p-2">
                <MapPin className="size-5 text-main-blue" />
              </div>

              <span>{value ? value : "Choose your location"}</span>
            </div>
            <ChevronRight className="size-5 text-main-blue" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] ">
          <DialogHeader>
            <DialogTitle>Price Location</DialogTitle>
          </DialogHeader>
          <Autocomplete
            handleAutoSelect={handleAutoSelect}
            isAllowAccessLoading={isLoading}
            value={value}
            onChange={onChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
