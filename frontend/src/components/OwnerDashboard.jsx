import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaUtensils, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerItemCard from "./OwnerItemCard";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#fff3ee] flex flex-col items-center overflow-x-hidden">
      <Nav />

      {/* When shop is not created */}
      <AnimatePresence>
        {!myShopData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center  p-6"
          >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center">
              <motion.div
                initial={{ rotate: -15 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <FaUtensils className="text-[#ff4d2d] w-20 h-20 mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Join our food delivery network and reach thousands of hungry
                customers every day.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/create-edit-shop")}
                className="bg-[#ff4d2d] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#e63e1c] transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* When shop exists */}
      <AnimatePresence>
        {myShopData && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center gap-8 px-4 sm:px-6 mt-28 mb-10"
          >
            {/* Welcome Section */}
            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3 text-center"
            >
              <FaUtensils className="text-[#ff4d2d] w-10 h-10 sm:w-12 sm:h-12" />
              Welcome to {myShopData.name}
            </motion.h1>

            {/* Shop Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-white/90 backdrop-blur-sm border border-[#ff4d2d]/10 shadow-lg rounded-2xl overflow-hidden w-full max-w-3xl relative"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-[#e63e1c] cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                <FaPen size={18} />
              </motion.div>

              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-56 sm:h-72 object-cover"
              />

              <div className="p-5 sm:p-6 space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {myShopData.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {myShopData.city}, {myShopData.state}
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  {myShopData.address}
                </p>
              </div>
            </motion.div>

            {/* No Items Section */}
            {myShopData.items.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl p-8 text-center">
                  <FaUtensils className="text-[#ff4d2d] w-16 h-16 mb-3 mx-auto" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Add Your Food Items
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Share your delicious creations and attract food lovers by
                    adding them to your menu.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/add-item")}
                    className="bg-[#ff4d2d] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#e63e1c] transition-all"
                  >
                    Add Food
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Items Section */}
            {myShopData.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-5 w-full max-w-3xl"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 self-start">
                  🍛 Your Menu
                </h2>
                {myShopData.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full"
                  >
                    <OwnerItemCard data={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OwnerDashboard;
