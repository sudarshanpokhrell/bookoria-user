import mongoose, { Document, Schema, Types } from "mongoose";

export interface OrderItem {
  book: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface Order extends Document {
  user: Types.ObjectId;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  orderDate: Date;
  shippingAddress?: string;
  createdAt: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema<Order> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book", // Referencing the Book model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"], // Order status options
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    shippingAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  (mongoose.models.Order as mongoose.Model<Order>) ||
  mongoose.model<Order>("Order", OrderSchema);


export default OrderModel;
