import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import BookCard from "./BookCard";

interface Book {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const books: Book[] = [
  {
    id: "1",
    title: "The Lord of the Rings",
    price: 14.99,
    imageUrl: "/images/book.jpeg",
  },
  {
    id: "2",
    title: "The Diary of a Young Girl",
    price: 7.99,
    imageUrl: "/images/book.jpeg",
  },
  {
    id: "3",
    title: "The Catcher in the Rye",
    price: 8.49,
    imageUrl: "/images/book.jpeg",
  },
  {
    id: "4",
    title: "Man's Search for Meaning",
    price: 8.49,
    imageUrl: "/images/book.jpeg",
  },
  {
    id: "5",
    title: "Man's Search for Meaning",
    price: 8.49,
    imageUrl: "/images/book.jpeg",
  },
  {
    id: "6",
    title: "Man's Search for Meaning",
    price: 8.49,
    imageUrl: "/images/book.jpeg",
  },
];

export function BookCarousel() {
  return (
    <div className="relative px-5  max-w-7xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="flex -ml-4">
          {books.map((book) => (
            <CarouselItem
              key={book.id}
              className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <BookCard book={book} />
            </CarouselItem>
          ))}
          <CarouselItem className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Card className="h-full shadow-none border-no">
              <CardContent className="flex items-center justify-center h-full p-4">
                <Button
                  variant="outline"
                  className="w-4/5  sm:py-6 text-sm sm:text-lg font-medium rounded-full border-2 text-gray-900 bg-white border-[#463F3A] hover:bg-[#463F3A] hover:text-white transition-colors"
                >
                  See more  
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-900 border border-gray-300 rounded-full p-6 shadow-md shadow-[#463F3A]  hover:bg-gray-100 transition-all" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-900 border border-gray-300 rounded-full p-6 shadow-md shadow-[#463F3A]  hover:bg-gray-100 transition-all" />
      </Carousel>
    </div>
  );
}

export default BookCarousel;
