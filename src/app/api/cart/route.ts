import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Not authenticated", success: false },
      { status: 401 }
    );
  }

  const userId = session.user._id;

  const body = await req.json();
  const { bookId, quantity = 1 } = body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (!Array.isArray(user.cart)) {
      user.cart = [];
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
      { success: true, message: "Book added to cart", cart: user.cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding book to cart:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Not authenticated", success: false },
      { status: 401 }
    );
  }

  try {
    const userId = session.user._id;
    const user = await UserModel.findById(userId).populate("cart.book");

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      },
      {status: 404}
    );

    }

    return NextResponse.json(
      {
        success: true,
        cart: user.cart,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
  }

