import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  console.log("Hello from the post 🥲");
  await dbConnect();

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Not authenticated",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const userId = session.user._id;
  console.log("Hello 🥲", userId);
  
  const body = await req.json();
  const { bookId, quantity = 1 } = body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const existingBook = user.cart.find(
      (item) => item.book.toString() === bookId
    );

    if (existingBook) {
      existingBook.quantity += quantity;
    } else {
      user.cart.push({ book: bookId, quantity });
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Book added to cart",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}