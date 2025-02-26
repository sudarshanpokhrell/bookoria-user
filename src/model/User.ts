import mongoose, { Document, Schema, Types } from "mongoose";

export interface CartItem {
  book: Types.ObjectId;
  quantity: number;
}

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  cart: CartItem[];
}

const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please provide valid email "],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is must."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
