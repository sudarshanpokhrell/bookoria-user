import { dbConnect } from "@/lib/dbConnect";
import BookModel from "@/model/Book";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "18", 10);

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return Response.json(
        {
          message: "Invalid pagination parameters",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const skip = (page - 1) * limit;

    const books = await BookModel.find().skip(skip).limit(limit);

    const totalBooks = await BookModel.countDocuments()
    const totalPages = Math.ceil(totalBooks/limit)
    return Response.json(
      {
        message: "Successfully Fetched books",
        success: true,
        data: {
          books,
          pagination:{
            totalPages,
            currentPage:page
          }
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in books API:", error);
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
