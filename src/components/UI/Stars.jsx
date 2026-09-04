import React from "react";
import { Star } from "lucide-react";

export default function Stars({ value, onChange, size = 14 }) {
  const interactive = !!onChange;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={interactive ? "cursor-pointer" : ""}
          fill={n <= value ? "#C2793B" : "none"}
          color={n <= value ? "#C2793B" : "#B9B4A8"}
          strokeWidth={1.5}
          onClick={interactive ? () => onChange(n) : undefined}
        />
      ))}
    </div>
  );
}
