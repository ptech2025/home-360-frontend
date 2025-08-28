"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  searchKey: string;
  placeHolder: string;
};

function SearchBar({ searchKey, placeHolder }: Props) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchVal, setSearchVal] = useState(
    searchParams?.get(searchKey) || ""
  );
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
      queryKey: ["projects", { page: 1, [searchKey]: debouncedSearchVal }],
    });

    queryClient.invalidateQueries({
      queryKey: ["clients", { page: 1, [searchKey]: debouncedSearchVal }],
    });

    const search = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${search}`, { scroll: false });

  }, [debouncedSearchVal, pathname, push, searchKey, searchParams]);

  return (
    <div className="group transition-colors  duration-200 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] border-sidebar-border relative flex h-full flex-1 items-center gap-2 rounded-lg border bg-transparent px-4 py-2.5 ">
      <button type="button" className="flex h-full items-center justify-center">
        <Search className="size-5 shrink-0 cursor-pointer transition-all text-main-blue " />
      </button>
      <input
        type="search"
        name={searchKey}
        value={searchVal}
        onChange={handleSearchChange}
        className="!m-0 w-full flex-grow border-0 text-sm !p-0 outline-none text-main-blue"
        placeholder={placeHolder}
      />
    </div>
  );
}
export default SearchBar;
