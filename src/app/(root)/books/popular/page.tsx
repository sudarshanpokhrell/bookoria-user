"use client";
import BookGrid from "@/components/BookGrid";
import PaginationComponent from "@/components/PaginationComponent";
import { Book } from "@/model/Book";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";

function PopularBooks() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/books?page=${page}&limit=18`);
      const data = await response.data;
      console.log(data);
      if (data.success) {
        setBooks(data.data.books);
        setTotalPages(data.data.pagination?.totalPages || 1);
        setCurrentPage(data.data.pagination?.currentPage || 1);
      } else {
        console.error("Failed to fetch books:", data.message);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    fetchData(page);
  }, [searchParams.get("page")]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      router.push(`/books?page=${page}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center item-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-4xl font-bold pl-3 pt-5 ">All Books</h1>
        <BookGrid className="mt-5">
          {books.length <= 0 ? (
            <li>No books</li>
          ) : (
            books.map((book) => <BookCard book={book} key={book._id} />)
          )}
        </BookGrid>
      </div>

      <PaginationComponent
        totalPage={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PopularBooks;
