import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({}); // { itemId: rating }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRating = async (itemId, rating) => {
    try {
      await axios.post(
        `${serverUrl}/api/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );
      setSelectedRating((prev) => ({ ...prev, [itemId]: rating }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-lg border border-gray-100 shadow-xl rounded-2xl p-5 space-y-5 hover:shadow-2xl transition-all duration-300"
    >
      {/* Order Header */}
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <p className="font-semibold text-gray-800">
            Order <span className="text-[#ff4d2d]">#{data._id.slice(-6)}</span>
          </p>
          <p className="text-sm text-gray-500">📅 {formatDate(data.createdAt)}</p>
        </div>
        <div className="text-right">
          {data.paymentMethod === "cod" ? (
            <p className="text-sm text-gray-600 font-medium">
              {data.paymentMethod?.toUpperCase()}
            </p>
          ) : (
            <p className="text-sm text-gray-600 font-medium">
              Payment:{" "}
              <span className={data.payment ? "text-green-600" : "text-red-500"}>
                {data.payment ? "Success" : "Pending"}
              </span>
            </p>
          )}
          <motion.p
            className="font-semibold mt-1 text-[#2563eb]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {data.shopOrders?.[0].status}
          </motion.p>
        </div>
      </div>

      {/* Each Shop Order */}
      {data.shopOrders.map((shopOrder, index) => (
        <div
          key={index}
          className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-[#fffaf7] to-white shadow-sm space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">{shopOrder.shop.name}</h3>
            <span className="text-sm text-blue-600 font-medium">
              {shopOrder.status}
            </span>
          </div>

          {/* Items */}
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d]/40">
            {shopOrder.shopOrderItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-44 border border-gray-200 rounded-xl p-2 bg-white hover:shadow-lg transition-all"
              >
                <img
                  src={item.item.image}
                  alt={item.name}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>

                  {/* Rating System */}
                  {shopOrder.status === "delivered" && (
                    <motion.div
                      className="flex space-x-1 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleRating(item.item._id, star)}
                          className={`text-lg transition-colors ${
                            selectedRating[item.item._id] >= star
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-300"
                          }`}
                        >
                          ★
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center border-t pt-3">
            <p className="font-semibold text-gray-800">
              Subtotal: ₹{shopOrder.subtotal}
            </p>
            <span
              className={`text-sm font-medium ${
                shopOrder.status === "delivered"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      {/* Total + Track Button */}
      <div className="flex justify-between items-center border-t pt-3">
        <p className="text-lg font-semibold text-gray-800">
          Total: ₹{data.totalAmount}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#ff4d2d] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:bg-[#e63e1c] transition-all"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track Order →
        </motion.button>
      </div>
    </motion.div>
  );
}

export default UserOrderCard;
