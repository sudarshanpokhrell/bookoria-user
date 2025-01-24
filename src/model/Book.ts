import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
  _id:string;
  title: string;
  author: string;
  description?: string;
  price: number;
  format?: string;
  category: string;
  coverImage: string;
  genre: string;
  publishedYear?: number;
  createdAt: Date;
  pages?: number;
  language?:string,
}

const BookSchema: Schema<Book> = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  format: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pages: {
    type: Number,
  },
  language:{
    type: String
  }
});

const BookModel =
  (mongoose.models.Book as mongoose.Model<Book>) ||
  mongoose.model<Book>("Book", BookSchema);

export default BookModel;
