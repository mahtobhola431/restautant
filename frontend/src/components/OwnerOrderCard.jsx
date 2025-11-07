import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([]);
  const dispatch = useDispatch();

  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg p-5 mb-5 hover:shadow-2xl transition-all duration-300"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex flex-wrap items-center gap-2">
            👤 {data.user.fullName}
          </h2>
          <p className="text-sm text-gray-500">{data.user.email}</p>
          <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MdPhone className="text-[#ff4d2d]" /> {data.user.mobile}
          </p>
          <p className="text-sm text-gray-600">
            {data.paymentMethod === "online"
              ? `Payment: ${data.payment ? "✅ Successful" : "❌ Pending"}`
              : `Payment Method: ${data.paymentMethod.toUpperCase()}`}
          </p>
        </div>

        <div className="text-sm text-right text-gray-600">
          <p className="font-medium text-gray-700">
            Order ID: <span className="text-[#ff4d2d] font-semibold">#{data._id.slice(-6)}</span>
          </p>
          <p className="text-gray-500">
            Status:{" "}
            <span className="capitalize font-semibold text-[#ff4d2d]">
              {data.shopOrders.status}
            </span>
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mt-3 text-gray-700 text-sm bg-[#fff7f3] border border-[#ff4d2d]/10 rounded-xl p-3 shadow-sm">
        <p className="font-medium">📍 Delivery Address:</p>
        <p className="text-sm mt-1">{data?.deliveryAddress?.text}</p>
        <p className="text-xs text-gray-500 mt-1">
          Lat: {data?.deliveryAddress.latitude} | Lon: {data?.deliveryAddress.longitude}
        </p>
      </div>

      {/* Order Items */}
      <div className="mt-4 flex space-x-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-[#ff4d2d]/30">
        {data.shopOrders.shopOrderItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-44 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-2"
          >
            <img
              src={item.item.image}
              alt={item.name}
              className="w-full h-28 object-cover rounded-lg"
            />
            <p className="text-sm font-semibold text-gray-800 mt-2 truncate">
              {item.name}
            </p>
            <p className="text-xs text-gray-500">
              Qty: {item.quantity} × ₹{item.price}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Status Controls */}
      <div className="flex justify-between items-center mt-3 border-t border-gray-100 pt-3">
        <span className="text-sm text-gray-700">
          Status:{" "}
          <span className="font-semibold capitalize text-[#ff4d2d]">
            {data.shopOrders.status}
          </span>
        </span>

        <select
          className="rounded-lg border border-[#ff4d2d]/40 text-[#ff4d2d] bg-white px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/50 transition-all cursor-pointer"
          onChange={(e) =>
            handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)
          }
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out Of Delivery</option>
        </select>
      </div>

      {/* Delivery Boy Assignment */}
      <AnimatePresence>
        {data.shopOrders.status === "out of delivery" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 rounded-xl bg-orange-50 border border-orange-100 shadow-sm"
          >
            <p className="font-medium text-gray-800 mb-2">
              {data.shopOrders.assignedDeliveryBoy
                ? "🚴 Assigned Delivery Boy:"
                : "🧍 Available Delivery Boys:"}
            </p>

            {availableBoys?.length > 0 ? (
              <div className="space-y-1">
                {availableBoys.map((b, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-700 text-sm"
                  >
                    • {b.fullName} — <span className="text-gray-500">{b.mobile}</span>
                  </motion.div>
                ))}
              </div>
            ) : data.shopOrders.assignedDeliveryBoy ? (
              <div className="text-gray-700 text-sm">
                {data.shopOrders.assignedDeliveryBoy.fullName} —{" "}
                {data.shopOrders.assignedDeliveryBoy.mobile}
              </div>
            ) : (
              <p className="text-gray-600 text-sm italic">
                Waiting for delivery boy to accept...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total */}
      <div className="text-right font-semibold text-gray-800 text-sm mt-3 border-t pt-3">
        Total: ₹{data.shopOrders.subtotal}
      </div>
    </motion.div>
  );
}

export default OwnerOrderCard;
