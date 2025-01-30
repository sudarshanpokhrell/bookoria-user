import { dbConnect } from "@/lib/dbConnect";
import BookModel from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { genre: string } }
) {
  dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "18", 10);
  const genre = params.genre;
  try {
    const skip = (page - 1) * limit;

    const books = await BookModel.find({
      category: "fiction",
      genre: genre,
    })
      .skip(skip)
      .limit(limit);

    const totalBooks = await BookModel.countDocuments({
      category: "fiction",
      genre,
    });
    const totalPages = Math.ceil(totalBooks / limit);

    if (books.length === 0) {
      return NextResponse.json(
        {
          message: "No books found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: "Successfully Fetched books",
        success: true,
        data: {
          books,
          pagination: {
            totalPages,
            currentPage: page,
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Error fetching data.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
