"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Route } from "next";
import { cn } from "@/lib/utils";

type PaginationContainerProps = {
  currentPage: number;
  totalPages: number;
  size?: number;
  contentTitle: string;
  searchKey: string;
  className?: string;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

import { Button } from "@/components/ui/button";
function PaginationContainer({
  currentPage,
  totalPages,
  searchKey,
  contentTitle,
  size = 10,
  className,
}: PaginationContainerProps) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const queryParams = Object.entries({
      [searchKey]: searchParams?.get(searchKey) || "",
      page: String(page),
      category: searchParams?.get("category") || "",
      tags: searchParams?.getAll("tags") || [],
      type: searchParams?.get("type") || "",
      rating: searchParams?.get("rating") || "",
    })
      .filter(([_, value]) => value !== "" && value !== undefined)
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map((v) => [key, v]) // expand arrays
          : [[key, value]]
      );

    const search = new URLSearchParams(queryParams).toString();
    push(`${pathname}?${search}` as Route, { scroll: false });
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        className={`border-sidebar-border transition-all duration-300 ${
          activeClass
            ? "bg-main-yellow text-white"
            : "text-black bg-transparent"
        }`}
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );
    // dots

    if (currentPage > 3) {
      pageButtons.push(
        <Button
          size="icon"
          className="border-sidebar-border"
          variant="outline"
          key="dots-1"
        >
          ...
        </Button>
      );
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }
    // one after current page

    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button
          size="icon"
          variant="outline"
          className="border-sidebar-border"
          key="dots-2"
        >
          ...
        </Button>
      );
    }
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageButtons;
  };

  if (totalPages <= 1) {
    return null;
  }
  return (
    <div
      className={cn(
        "flex  w-full flex-col sm:flex-row items-center sm:justify-between",
        className
      )}
    >
      <p className="font-circular-light text-sm text-gray">
        Showing {size} {contentTitle} per page
      </p>

      <div className="flex gap-x-2">
        {/* prev */}
        <Button
          className="flex items-center gap-x-2 border-sidebar-border"
          variant="outline"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = totalPages;
            handlePageChange(prevPage);
          }}
        >
          <ChevronLeft />
        </Button>
        {renderPageButtons()}
        {/* next */}
        <Button
          className="flex items-center gap-x-2 border-sidebar-border"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > totalPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
export default PaginationContainer;
