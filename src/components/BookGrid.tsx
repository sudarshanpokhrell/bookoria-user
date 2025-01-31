import React from "react";
import { twMerge } from "tailwind-merge";

interface BookGridProps {
  children: React.ReactNode;
  className?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "min-h-full w-full grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BookGrid;
