import { useServiceProviderStore } from "@/store/serviceProviderStore";
import { Button } from "../ui/button";
import { ProviderType } from "@/types/prisma-schema-types";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Route } from "next";

export function GoogleServiceFilter() {
  const { clearAll, category, setCategory, rating, setRating } =
    useServiceProviderStore();
  return (
    <div className="bg-white  rounded-t-md hidden md:flex flex-col gap-4 w-full p-4">
      <div className="w-full flex items-center justify-between gap-4">
        <h2 className="text-base text-black font-circular-medium font-medium">
          Filter
        </h2>
        <Button
          onClick={clearAll}
          variant={"link"}
          className="text-main-yellow shrink-0 px-0"
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        <h5 className="text-black text-sm font-medium font-circular-medium">
          All Categories
        </h5>
        <RadioGroup
          value={category}
          onValueChange={(value) => {
            setCategory(value as ProviderType);
          }}
          className="flex flex-col gap-2 w-full"
        >
          {Object.values(ProviderType).map((category) => (
            <Label
              key={category}
              className="flex items-center group py-1 gap-2 cursor-pointer"
              htmlFor={category}
            >
              <RadioGroupItem
                value={category}
                id={category}
                className="data-[state=checked]:text-main-green [&_svg]:size-3 "
              />
              <span className="text-black text-sm capitalize group-hover:text-main-green">
                {category.replace("_", " ")}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>{" "}
      <div className="flex flex-col gap-2.5 w-full">
        <h5 className="text-black text-sm font-medium font-circular-medium">
          Minimum Rating
        </h5>
        <RadioGroup
          value={rating ? String(rating) : undefined}
          onValueChange={(value) => {
            setRating(parseInt(value));
          }}
          className="flex flex-col gap-2 w-full"
        >
          {Array.from({ length: 5 }).map((_, rate) => (
            <Label
              key={rate + 1}
              className="flex items-center group py-1 gap-2 cursor-pointer"
              htmlFor={`rate-${rate + 1}`}
            >
              <RadioGroupItem
                value={String(rate + 1)}
                id={`rate-${rate + 1}`}
                className="data-[state=checked]:text-main-green [&_svg]:size-3 "
              />
              <Star className="size-4 text-main-yellow fill-main-yellow" />
              <span className="text-black text-sm capitalize group-hover:text-main-green">
                {rate + 1} {rate + 1 === 1 ? "Star" : "Stars"}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export function ProviderTypeFilter() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const status = searchParams.get("status");
  const size = searchParams.get("size");
  const homeId = searchParams.get("homeId");
  const type = searchParams.get("type") as ProviderType | null;
  const rating = searchParams.get("rating");

  const handleTypeChange = (newType: ProviderType | null) => {
    const queryParams: Record<string, string> = Object.fromEntries(
      Object.entries({
        page: "1",
        status: status || "",
        size: size || "",
        homeId: homeId || "",
        rating: rating || "",
        type: newType || "",

        //eslint-disable-next-line
      }).filter(([_, value]) => value !== "")
    );
    const search = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${search}` as Route, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md bg-gray/20 text-black capitalize px-4 py-2 has-[>svg]:px-3 h-full gap-2 flex items-center border border-sidebar-border text-sm max-w-max">
        <span>
          {Object.values(ProviderType)
            .find((opt) => opt === type)
            ?.replace("_", " ") || "All Categories"}
        </span>{" "}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(ProviderType).map((opt) => {
          return (
            <DropdownMenuCheckboxItem
              key={opt}
              checked={opt === type}
              className="capitalize cursor-pointer hover:text-main-green data-[state=checked]:text-main-green"
              onCheckedChange={(checkedState) =>
                handleTypeChange(checkedState ? opt : null)
              }
            >
              <span>{opt.replace("_", " ")}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProviderRatingFilter() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const status = searchParams.get("status");
  const size = searchParams.get("size");
  const homeId = searchParams.get("homeId");
  const type = searchParams.get("type") as ProviderType | null;
  const rating = searchParams.get("rating") || "";

  const handleRatingChange = (newRating: string | null) => {
    const queryParams: Record<string, string> = Object.fromEntries(
      Object.entries({
        page: "1",
        status: status || "",
        size: size || "",
        homeId: homeId || "",
        type: type || "",
        rating: newRating || "",

        //eslint-disable-next-line
      }).filter(([_, value]) => value !== "")
    );
    const search = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${search}` as Route, { scroll: false });
  };

  const ratingOptions = Array.from({ length: 5 }).map((_, rate) => ({
    value: rate + 1,
    label: `${rate + 1} ${rate + 1 > 1 ? "Stars" : "Star"}`,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md bg-gray/20 text-black capitalize px-4 py-2 has-[>svg]:px-3 h-full gap-2 flex items-center border border-sidebar-border text-sm max-w-max">
        <span>
          {ratingOptions.find((opt) => opt.value === parseInt(rating))?.label ||
            "All Ratings"}
        </span>{" "}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ratingOptions.map((opt) => {
          return (
            <DropdownMenuCheckboxItem
              key={opt.value}
              checked={opt.value === parseInt(rating)}
              className="capitalize cursor-pointer hover:text-main-green data-[state=checked]:text-main-green"
              onCheckedChange={(checkedState) =>
                handleRatingChange(checkedState ? opt.value.toString() : null)
              }
            >
              <span>{opt.label}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
