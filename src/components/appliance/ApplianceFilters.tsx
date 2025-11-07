"use client";

import { ApplianceCategory } from "@/types/prisma-schema-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Route } from "next";

export function ApplianceFilter() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const search = searchParams.get("search");
  const hasWarranty = searchParams.get("hasWarranty");
  const hasMaintenance = searchParams.get("hasMaintenance");
  const category = searchParams.get("category") as ApplianceCategory | null;

  const handleCategoryChange = (newCategory: ApplianceCategory | null) => {
    const queryParams: Record<string, string> = Object.fromEntries(
      Object.entries({
        page: page || "",
        size: size || "",
        search: search || "",
        category: newCategory || "",
        //eslint-disable-next-line
      }).filter(([_, value]) => value !== "")
    );
    const searchString = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${searchString}` as Route, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md bg-gray/20 text-black capitalize px-4 py-2 has-[>svg]:px-3 h-full gap-2 flex items-center border border-sidebar-border text-sm max-w-max">
        <span>
          {Object.values(ApplianceCategory)
            .find((opt) => opt === category)
            ?.replace("_", " ") || "All Categories"}
        </span>{" "}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(ApplianceCategory).map((opt) => {
          return (
            <DropdownMenuCheckboxItem
              key={opt}
              checked={opt === category}
              className="capitalize cursor-pointer hover:text-main-green data-[state=checked]:text-main-green"
              onCheckedChange={(checkedState) =>
                handleCategoryChange(checkedState ? opt : null)
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
