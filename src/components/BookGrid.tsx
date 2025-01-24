import React from "react";
import { twMerge } from "tailwind-merge";

interface BookGridProps {
  children: React.ReactNode;
  className?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ children, className }) => {
  return (
    <div className={twMerge("min-h-full w-full grid grid-cols-6", className)}>
      {children}
    </div>
  );
};

export default BookGrid;
