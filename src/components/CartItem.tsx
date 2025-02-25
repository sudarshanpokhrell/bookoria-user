import { Book } from "@/model/Book";
import React from "react";

interface CartItemProps {
  item: {
    book: Book;
    quantity: number;
  };
  updateCart: (bookId: string, action: "increase" | "decrease") => void;
}

function CartItem({ item, updateCart }: CartItemProps) {
  return (
    <li className="flex items-center gap-6 p-5 border-b border-gray-100 last:border-0">
      <img
        src={item.book.coverImage}
        alt={item.book.title}
        className="w-16 h-24 object-cover rounded shadow"
      />
      
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.book.title}</h3>
        <p className="text-sm text-gray-500">By {item.book.author}</p>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-medium text-gray-900">${item.book.price}</p>
          
          <div className="flex items-center">
            <button
              onClick={() => updateCart(item.book._id, "decrease")}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <span className="text-xl">−</span>
            </button>
            
            <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
            
            <button
              onClick={() => updateCart(item.book._id, "increase")}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Increase quantity"
            >
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;