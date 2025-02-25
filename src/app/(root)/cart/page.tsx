"use client";

import CartItem from "@/components/CartItem";
import { Book } from "@/model/Book";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CartItemType {
  book: Book;
  quantity: number;
}

function Cart() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const response = await axios.get("/api/cart");
        const data = response.data;

        if (data.success) {
          setCart(data.cart);
        } else {
          console.error("Failed to fetch cart:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const updateCart = async (
    bookId: string,
    action: "increase" | "decrease"
  ) => {
    try {
      const response = await axios.patch("/api/cart/update", {
        bookId,
        action,
      });

      const data = response.data;

      if (data.success) {
        setCart((prevCart) =>
          prevCart
            .map((item) =>
              item.book._id === bookId
                ? {
                    ...item,
                    quantity:
                      action === "increase"
                        ? item.quantity + 1
                        : item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
      } else {
        console.error("Failed to update cart:", data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.book.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">Your Cart</h2>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : cart.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">Your cart is empty</p>
          <Link href={"/books"}>
            <button className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <CartItem
                key={item.book._id}
                item={item}
                updateCart={updateCart}
              />
            ))}
          </ul>

          <div className="p-5 bg-gray-50 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total ({cart.length} items)
              </p>
              <p className="text-xl font-medium text-gray-900">
                ${calculateTotal()}
              </p>
            </div>

            <button className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
