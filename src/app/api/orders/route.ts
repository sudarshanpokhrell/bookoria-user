import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import BookModel, { Book } from "@/model/Book";
import OrderModel from "@/model/Order";

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

  try {
    const user = await UserModel.findById(userId).populate("cart.book");

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (user.cart.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty", success: false },
        { status: 400 }
      );
    }

    const orderItems = user.cart.map((item) => {
      const book = item.book as any;
      return {
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      };
    });

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrder = new OrderModel({
      user: userId,
      orderItems,
      totalPrice,
      status: "pending",
    });

    await newOrder.save();

    for (let item of orderItems) {
      await BookModel.findByIdAndUpdate(item.book, {
        $inc: { stock: -item.quantity },
      });
    }

    user.cart = [];
    await user.save();

    return NextResponse.json(
      {
        message: "Order placed successfully",
        order: newOrder,
        success: true // Added success flag here
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error placing order:", error);
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

  const userId = session.user._id;

  try {
    const orders = await OrderModel.find({ user: userId })
      .populate("orderItems.book")
      .sort({ createdAt: -1 })
      .exec();

    

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
