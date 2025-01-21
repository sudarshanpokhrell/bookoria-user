import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
  _id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  format?: string;
  category: string;
  imageUrl: string;
  genre: string[];
  publishedYear?: number;
  createdAt: Date;
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
  genre: [
    {
      type: String,
      required: true,
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
