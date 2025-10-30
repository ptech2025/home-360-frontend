import { Star } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // number from 0–5 (can be decimal like 3.5)
  max?: number; // default 5
  className?: string; // optional custom styles for icons
}

 function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const halfFilled = !filled && i + 0.5 <= rating;

        return (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              filled
                ? "fill-main-yellow text-main-yellow"
                : halfFilled
                ? "fill-main-yellow text-main-yellow"
                : "text-gray-300",
              className
            )}
          />
        );
      })}
    </div>
  );
}

export default StarRating