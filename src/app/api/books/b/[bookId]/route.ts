import { dbConnect } from "@/lib/dbConnect";
import BookModel from "@/model/Book";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { bookId: string };
  }
)  {
  dbConnect();
  const { bookId } = params;
  try {
    const book = await BookModel.findById(bookId);

    if (!book) {
      return Response.json(
        {
          message: "Book not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: "Successfully fetched book",
        success: true,
        data: book,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
