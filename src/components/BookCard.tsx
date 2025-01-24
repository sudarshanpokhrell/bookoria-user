import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/model/Book";

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <Card className="shadow-transparent border-none h-full">
      <CardContent className="p-2 sm:p-4 flex flex-col items-center h-full">
        <div className="w-full aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden mb-2 sm:mb-4">
          <Image
            src={book?.coverImage || "/images/book.jpeg"}
            alt={book?.title}
            width={400}
            height={600}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            objectFit="cover"
          />
        </div>
        <h3 className="text-sm sm:text-lg font-medium text-center mb-1 sm:mb-2 line-clamp-2">
          {book?.title}
        </h3>
        {/* <p className="text-md">{book?.author}</p> */}
        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
          ${book?.price.toFixed(2)}
        </p>
        <Button
          variant="outline"
          className="w-full py-2 sm:py-6 text-sm sm:text-lg font-medium rounded-full border-2 object-cover text-gray-900 bg-white border-[#463F3A] hover:bg-[#463F3A] hover:text-white transition-colors mt-auto"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
