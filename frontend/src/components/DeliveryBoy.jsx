import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { ClipLoader } from "react-spinners";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

function DeliveryBoy() {
  const { userData, socket } = useSelector((state) => state.user);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [otp, setOtp] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🛰️ Location Update via Socket
  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDeliveryBoyLocation({ lat: latitude, lon: longitude });
          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData._id,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  // 💰 Earnings Calculation
  const ratePerDelivery = 50;
  const totalEarning = todayDeliveries.reduce(
    (sum, d) => sum + d.count * ratePerDelivery,
    0
  );

  // 📦 Fetch Data Functions
  const getAssignments = async () => {
    const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
      withCredentials: true,
    });
    setAvailableAssignments(result.data);
  };

  const getCurrentOrder = async () => {
    const result = await axios.get(`${serverUrl}/api/order/get-current-order`, {
      withCredentials: true,
    });
    setCurrentOrder(result.data);
  };

  const acceptOrder = async (assignmentId) => {
    await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, {
      withCredentials: true,
    });
    getCurrentOrder();
  };

  const sendOtp = async () => {
    setLoading(true);
    await axios.post(
      `${serverUrl}/api/order/send-delivery-otp`,
      {
        orderId: currentOrder._id,
        shopOrderId: currentOrder.shopOrder._id,
      },
      { withCredentials: true }
    );
    setShowOtpBox(true);
    setLoading(false);
  };

  const verifyOtp = async () => {
    setMessage("");
    const result = await axios.post(
      `${serverUrl}/api/order/verify-delivery-otp`,
      {
        orderId: currentOrder._id,
        shopOrderId: currentOrder.shopOrder._id,
        otp,
      },
      { withCredentials: true }
    );
    setMessage(result.data.message);
    setTimeout(() => location.reload(), 1500);
  };

  const handleTodayDeliveries = async () => {
    const result = await axios.get(
      `${serverUrl}/api/order/get-today-deliveries`,
      { withCredentials: true }
    );
    setTodayDeliveries(result.data);
  };

  // 🔄 Initial Data Fetch
  useEffect(() => {
    getAssignments();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [userData]);

  // 📡 Listen for new assignments
  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      setAvailableAssignments((prev) => [...(prev || []), data]);
    });
    return () => socket?.off("newAssignment");
  }, [socket]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-[#fff9f6] to-[#fff3ee]">
      <Nav />

      <motion.div
        className="w-full max-w-[850px] mt-28 flex flex-col gap-6 items-center px-4 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Welcome Card */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md rounded-2xl p-6 text-center w-full"
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-2xl font-bold text-[#ff4d2d] mb-2">
            Welcome, {userData.fullName} 👋
          </h1>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold text-[#ff4d2d]">Latitude:</span>{" "}
            {deliveryBoyLocation?.lat?.toFixed(4)} |{" "}
            <span className="font-semibold text-[#ff4d2d]">Longitude:</span>{" "}
            {deliveryBoyLocation?.lon?.toFixed(4)}
          </p>
        </motion.div>

        {/* 📊 Today's Deliveries Chart */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl shadow-lg p-6 w-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-[#ff4d2d] mb-4">
            Today’s Deliveries Overview
          </h2>
          <div className="w-full h-[220px]">
            <ResponsiveContainer>
              <BarChart data={todayDeliveries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
                <YAxis allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [value, "orders"]}
                  labelFormatter={(label) => `${label}:00`}
                />
                <Bar dataKey="count" fill="#ff4d2d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings Card */}
          <div className="mt-6 text-center bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow p-5">
            <h3 className="text-gray-700 font-medium text-lg">
              Today’s Earnings
            </h3>
            <motion.span
              key={totalEarning}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-green-600 mt-1 block"
            >
              ₹{totalEarning}
            </motion.span>
          </div>
        </motion.div>

        {/* Available Orders */}
        {!currentOrder && (
          <motion.div
            className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md rounded-2xl p-6 w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-[#ff4d2d] mb-4">
              🧾 Available Orders
            </h2>

            <div className="space-y-4">
              {availableAssignments?.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex justify-between items-center bg-white/80"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {a.shopName}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Delivery:</span>{" "}
                        {a.deliveryAddress.text}
                      </p>
                      <p className="text-xs text-gray-400">
                        {a.items.length} items | ₹{a.subtotal}
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => acceptOrder(a.assignmentId)}
                      className="bg-[#ff4d2d] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#e63e1c] transition"
                    >
                      Accept
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-3">
                  No available orders right now 🚫
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Current Order */}
        {currentOrder && (
          <motion.div
            className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl shadow-md p-6 w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              📦 Current Order
            </h2>

            <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-[#fffaf7]">
              <p className="font-semibold text-sm">
                {currentOrder?.shopOrder.shop.name}
              </p>
              <p className="text-sm text-gray-500">
                {currentOrder.deliveryAddress.text}
              </p>
              <p className="text-xs text-gray-400">
                {currentOrder.shopOrder.shopOrderItems.length} items | ₹
                {currentOrder.shopOrder.subtotal}
              </p>
            </div>

            <DeliveryBoyTracking
              data={{
                deliveryBoyLocation:
                  deliveryBoyLocation || {
                    lat: userData.location.coordinates[1],
                    lon: userData.location.coordinates[0],
                  },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                },
              }}
            />

            {/* OTP Verification */}
            {!showOtpBox ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendOtp}
                disabled={loading}
                className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all"
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Mark As Delivered"}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 border rounded-xl bg-gray-50 shadow-sm"
              >
                <p className="text-sm font-semibold mb-2">
                  Enter OTP sent to{" "}
                  <span className="text-[#ff4d2d]">
                    {currentOrder.user.fullName}
                  </span>
                </p>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/50"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {message && (
                  <p className="text-center text-green-500 font-semibold mb-2">
                    {message}
                  </p>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={verifyOtp}
                  className="w-full bg-[#ff4d2d] hover:bg-[#e63e1c] text-white py-2 rounded-lg font-semibold shadow-md"
                >
                  Submit OTP
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default DeliveryBoy;
