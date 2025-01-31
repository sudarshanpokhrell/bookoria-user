"use client";

import type { Book } from "@/model/Book";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function BookDetails() {
  const [book, setBook] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const { bookId } = params;

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/books/b/${bookId}`);
        if (response.data.success) {
          setBook(response.data.data);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/3 h-[500px] rounded-2xl" />
          <div className="w-full md:w-2/3 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Book not found</h2>
          <p className="mt-2 text-gray-600">
            The book you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-8">
            <Image
              src={book.coverImage || "/images/book.jpeg"}
              alt={book.title}
              width={400}
              height={600}
              className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              priority
            />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-xl text-gray-600">by {book.author}</p>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Language</p>
              <p className="text-lg font-medium text-gray-900">{book.language}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Format</p>
              <p className="text-lg font-medium text-gray-900">{book.format}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Pages</p>
              <p className="text-lg font-medium text-gray-900">{book.pages}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>Category:</span>
              <span className="font-medium text-gray-900 capitalize">{book.category}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>Genre:</span>
              <span className="font-medium text-gray-900 capitalize">{book.genre}</span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <p className="text-3xl font-bold text-gray-900">${book.price.toFixed(2)}</p>
            <Button className="w-full py-6 text-lg font-medium rounded-full bg-[#463F3A] hover:bg-[#3c3632] text-white transition-colors">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
