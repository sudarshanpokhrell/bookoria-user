"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/model/Book";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const router = useRouter();

  const handleBookClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is not a button before navigating
    if (!(e.target as HTMLElement).closest("button")) {
      router.push(`/books/b/${book._id}`);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const response = await axios.post("/api/cart", {
        bookId: book._id,
      });

      toast({
        title: "Success",
        description: "Book added to cart successfully",
      });

    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/sign-in");
        return;
      }

      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-transparent border-none h-full">
      <CardContent
        className="p-2 sm:p-4 flex flex-col items-center h-full"
        onClick={handleBookClick}
      >
        <div className="w-full aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden mb-2 sm:mb-4">
          <Image
            src={book?.coverImage || "/images/book.jpeg"}
            alt={book?.title || "Book cover"}
            width={400}
            height={600}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            objectFit="cover"
          />
        </div>
        <h3 className="text-sm sm:text-lg font-medium text-center mb-1 sm:mb-2 line-clamp-2">
          {book?.title}
        </h3>
        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
          ${book?.price?.toFixed(2)}
        </p>
        <Button
          variant="outline"
          className="w-full py-2 sm:py-6 text-sm sm:text-lg font-medium rounded-full border-2 object-cover text-gray-900 bg-white border-[#463F3A] hover:bg-[#463F3A] hover:text-white transition-colors mt-auto"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;