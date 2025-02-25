"use client"

import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Book } from "@/model/Book";

interface BookCarouselProps {
  carouselType: "new-arrivals" | "popular";
  title?: string;
}

export function BookCarousel({ carouselType, title }: BookCarouselProps) {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks(carouselType);
  }, [carouselType]);

  const fetchBooks = async (type: "new-arrivals" | "popular") => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/books/${type}?limit=5`);
      
      const data = response.data;
      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || "Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("An error occurred while fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    router.push(`/books/${carouselType}`);
  };

  // Display the provided title or a default based on carouselType
  const displayTitle = title || (carouselType === "new-arrivals" ? "New Arrivals" : "Popular Books");

  // Loading skeleton
  const renderLoadingSkeleton = () => {
    return Array(4).fill(0).map((_, index) => (
      <CarouselItem
        key={`skeleton-${index}`}
        className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
      >
        <Card className="h-full shadow-sm border">
          <CardContent className="p-0">
            <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-2"></div>
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ));
  };

  // Error state
  if (error) {
    return (
      <div className="relative px-5 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">{displayTitle}</h2>
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          <p>Failed to load books. {error}</p>
          <Button onClick={() => fetchBooks(carouselType)} className="mt-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-5 max-w-7xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="flex -ml-4">
          {loading ? (
            renderLoadingSkeleton()
          ) : (
            <>
              {books.map((book) => (
                <CarouselItem
                  key={book._id}
                  className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <BookCard book={book} />
                </CarouselItem>
              ))}
              <CarouselItem className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="h-full shadow-none border-0">
                  <CardContent className="flex items-center justify-center h-full p-4">
                    <Button
                      variant="outline"
                      onClick={handleSeeMore}
                      className="w-4/5 sm:py-6 text-sm sm:text-lg font-medium rounded-full border-2 text-gray-900 bg-white border-[#463F3A] hover:bg-[#463F3A] hover:text-white transition-colors"
                    >
                      See more
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            </>
          )}
        </CarouselContent>

        {/* Only show navigation controls when not loading */}
        {!loading && (
          <>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-900 border border-gray-300 rounded-full p-6 shadow-md shadow-[#463F3A] hover:bg-gray-100 transition-all" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-900 border border-gray-300 rounded-full p-6 shadow-md shadow-[#463F3A] hover:bg-gray-100 transition-all" />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default BookCarousel;