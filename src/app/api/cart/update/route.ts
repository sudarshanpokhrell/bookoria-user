import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const { bookId, action } = await req.json();

  try {
    const user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const cartItem = user.cart.find((item) => item.book.toString() === bookId);

    if (!cartItem) {
      return NextResponse.json(
        { success: false, message: "Book not in cart" },
        { status: 404 }
      );
    }

    if (action == "increase") {
      cartItem.quantity += 1;
    } else if (action == "decrease") {
      cartItem.quantity -= 1;
      if (cartItem.quantity <= 0) {
        user.cart = user.cart.filter((item) => item.book.toString() !== bookId);
      }
    }

    await user.save();
    return NextResponse.json(
      { success: true, message: "Cart updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
