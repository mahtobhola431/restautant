import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { FaStore, FaUtensils } from "react-icons/fa";
import { FaLocationDot, FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "../components/FoodCard";

function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`, {
        withCredentials: true,
      });
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f6] to-[#fff4ed] relative overflow-x-hidden">
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#ff4d2d]/80 hover:bg-[#ff4d2d] text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
        <span className="font-medium">Back</span>
      </motion.button>

      {/* Banner Section */}
      {shop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-72 md:h-80 lg:h-[420px] overflow-hidden"
        >
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center text-white px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <FaStore className="text-white text-5xl drop-shadow-lg" />
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                {shop.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <FaLocationDot size={18} color="#ff4d2d" />
                <p className="text-gray-200 text-base">{shop.address}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-gray-900">
            <FaUtensils className="text-[#ff4d2d]" /> Our Menu
          </h2>
          <div className="w-24 h-[3px] bg-[#ff4d2d] mx-auto mt-2 rounded-full" />
        </motion.div>

        {/* Food Items Grid */}
        <AnimatePresence>
          {items.length > 0 ? (
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <FoodCard data={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 text-lg"
            >
              No items available yet 🍽️
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Shop;
