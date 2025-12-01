"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search } from "lucide-react";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";
import { Route } from "next";
import { cn } from "@/lib/utils";

type Props = {
  searchKey: string;
  placeHolder: string;
  className?: string;
};

function SearchBar({ searchKey, placeHolder, className }: Props) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchVal, setSearchVal] = useState(
    searchParams?.get(searchKey) || ""
  );
  const params = useParams();
  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearchVal(searchValue);
  };

  useEffect(() => {
    const rawPage = searchParams?.get("page");
    const currentVal = searchParams?.get(searchKey) || "";

    if (debouncedSearchVal.trim() === currentVal) return;

    const queryParams: Record<string, string> = Object.fromEntries(
      Object.entries({
        [searchKey]: debouncedSearchVal.trim(),
        page: debouncedSearchVal.trim().length > 0 ? "1" : rawPage || "",
        status: searchParams?.get("status") || "",
        //eslint-disable-next-line
      }).filter(([_, value]) => value !== "")
    );

    queryClient.invalidateQueries({
      queryKey: [
        "all-tasks",
        params.homeId,
        { page: 1, [searchKey]: debouncedSearchVal },
      ],
    });

    const search = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${search}` as Route, { scroll: false });

    // eslint-disable-next-line
  }, [debouncedSearchVal, pathname, push, searchKey, searchParams]);

  return (
    <div
      className={cn(
        "group transition-colors  duration-200 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] border-sidebar-border relative flex h-full flex-1 items-center gap-2 rounded-lg border bg-transparent px-4 py-2.5 ",
        className
      )}
    >
      <button type="button" className="flex h-full items-center justify-center">
        <Search className="size-5 shrink-0 cursor-pointer transition-all text-black " />
      </button>
      <input
        type="search"
        name={searchKey}
        value={searchVal}
        onChange={handleSearchChange}
        className="!m-0 w-full flex-grow border-0 text-sm !p-0 outline-none text-black"
        placeholder={placeHolder}
      />
    </div>
  );
}
export default SearchBar;
