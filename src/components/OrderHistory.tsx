"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  price: number;
}

interface OrderItem {
  book: Book;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  createdAt: string;
  status: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch orders");

        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "⏳";
      case "shipped":
        return "🚚";
      case "delivered":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  const formatOrderId = (orderId: string) => {
    return orderId.substring(orderId.length - 6).toUpperCase();
  };


  if (loading) 
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="w-full h-48 rounded-xl" />
        <Skeleton className="w-full h-48 rounded-xl" />
      </div>
    );

  if (error) 
    return (
      <div className="p-6 bg-red-50 text-red-500 rounded-xl border border-red-200 shadow-sm">
        <div className="font-medium mb-2">Unable to load your orders</div>
        <div className="text-sm">{error}</div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center py-10 px-6">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">You haven&apost placed any orders yet. Start exploring our collection to find your next favorite book.</p>
        <Link
          href="/books" 
          className="inline-flex items-center px-4 py-2 bg-[#1F2937] text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Browse Books
        </Link>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Package className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900">Your Orders</h2>
      </div>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card 
            key={order._id} 
            className="overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-50 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-lg" role="img" aria-label={order.status}>
                      {getStatusIcon(order.status)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Order #{formatOrderId(order._id)}</div>
                    <Badge 
                      className={`mt-1 ${getStatusColor(order.status)} border px-2 py-0.5 text-xs font-medium`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                  {format(new Date(order.createdAt), "MMMM d, yyyy")}
                </div>
              </div>
            </div>
            
            <CardContent className="p-0">
              <div className="px-6 py-4">
                <ul className="divide-y divide-gray-100">
                  {order.orderItems.map((item) => (
                    <li key={item.book._id} className="py-3 flex items-center">
                      <div className="bg-gray-100 h-8 w-8 rounded flex items-center justify-center mr-3 text-gray-500 font-medium">
                        {item.quantity}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900 font-medium truncate">
                          {item.book.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${item.price.toFixed(2)} per book
                        </div>
                      </div>
                      <div className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-500">
                    {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 mr-2">Total Amount:</span>
                  <span className="text-lg font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}