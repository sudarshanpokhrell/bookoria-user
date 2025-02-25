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
  publishedYear?: Date;
  createdAt: Date;
  pages?: number;
  language?:string,
  sold?:number
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
  },
  sold:{
    type: Number,
    default: 0
  },
  publishedYear: {
    type: Date,
  },
});

const BookModel =
  (mongoose.models.Book as mongoose.Model<Book>) ||
  mongoose.model<Book>("Book", BookSchema);

export default BookModel;
