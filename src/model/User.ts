import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
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
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
