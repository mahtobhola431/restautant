import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { serverUrl } from "../App";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";

function TrackOrderPage() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const [liveLocations, setLiveLocations] = useState({});
  const { socket } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("updateDeliveryLocation", ({ deliveryBoyId, latitude, longitude }) => {
      setLiveLocations((prev) => ({
        ...prev,
        [deliveryBoyId]: { lat: latitude, lon: longitude },
      }));
    });

    return () => socket.off("updateDeliveryLocation");
  }, [socket]);

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#fff3ee] py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto flex items-center gap-2 mb-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 transition"
        >
          <IoIosArrowRoundBack size={28} className="text-[#ff4d2d]" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
      </motion.div>

      {/* Orders Section */}
      <div className="max-w-5xl mx-auto space-y-6">
        <AnimatePresence>
          {currentOrder?.shopOrders?.map((shopOrder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-md border border-orange-100 shadow-md rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all duration-300"
            >
              {/* Shop Info */}
              <div>
                <h2 className="text-lg font-bold text-[#ff4d2d]">
                  {shopOrder.shop.name}
                </h2>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Items:</span>{" "}
                  {shopOrder.shopOrderItems?.map((i) => i.name).join(", ")}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Subtotal:</span> ₹{shopOrder.subtotal}
                </p>
                <p className="mt-4 text-gray-700">
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {currentOrder.deliveryAddress?.text}
                </p>
              </div>

              {/* Status Section */}
              {shopOrder.status !== "delivered" ? (
                <div className="flex flex-col gap-1 text-gray-700">
                  {shopOrder.assignedDeliveryBoy ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#fff6f4] border border-orange-100 rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold">
                          Delivery Boy:{" "}
                          <span className="text-[#ff4d2d]">
                            {shopOrder.assignedDeliveryBoy.fullName}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: {shopOrder.assignedDeliveryBoy.mobile}
                        </p>
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                        className="text-xs bg-[#ff4d2d]/10 text-[#ff4d2d] px-3 py-1 rounded-full font-medium mt-2 sm:mt-0"
                      >
                        {shopOrder.status.charAt(0).toUpperCase() +
                          shopOrder.status.slice(1)}
                      </motion.span>
                    </motion.div>
                  ) : (
                    <p className="font-medium text-gray-500 italic">
                      Delivery Boy not assigned yet ⏳
                    </p>
                  )}
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-600 font-bold text-lg text-center bg-green-50 border border-green-100 rounded-lg py-2"
                >
                  ✅ Delivered Successfully
                </motion.p>
              )}

              {/* Live Tracking Map */}
              {shopOrder.assignedDeliveryBoy &&
                shopOrder.status !== "delivered" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-[400px] w-full rounded-2xl overflow-hidden border border-orange-100 shadow-md mt-3"
                  >
                    <DeliveryBoyTracking
                      data={{
                        deliveryBoyLocation:
                          liveLocations[shopOrder.assignedDeliveryBoy._id] || {
                            lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                            lon: shopOrder.assignedDeliveryBoy.location.coordinates[0],
                          },
                        customerLocation: {
                          lat: currentOrder.deliveryAddress.latitude,
                          lon: currentOrder.deliveryAddress.longitude,
                        },
                      }}
                    />
                  </motion.div>
                )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TrackOrderPage;
