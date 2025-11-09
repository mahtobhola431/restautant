




import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { FaStore, FaUtensils, FaStar, FaClock } from "react-icons/fa";
import { FaLocationDot, FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "../components/FoodCard";

function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/get-by-shop/${shopId}`,
        { withCredentials: true }
      );
      setShop(result.data.shop);
      setItems(result.data.items);
      setFilteredItems(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  // Extract unique categories from items
  const categories = ["All", ...new Set(items.map((i) => i.category))];

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFilteredItems(items);
    else setFilteredItems(items.filter((i) => i.category === category));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f6] to-[#fff4ed] relative overflow-x-hidden">
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#ff4d2d]/90 hover:bg-[#ff4d2d] text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
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
            className="w-full h-full object-cover brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end px-6 pb-10 text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-start gap-2"
            >
              <div className="flex items-center gap-3">
                <FaStore className="text-white text-3xl drop-shadow-md" />
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg">
                  {shop.name}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <FaLocationDot size={16} color="#ff4d2d" />
                  <p className="truncate max-w-[250px] md:max-w-none">
                    {shop.address || "Address not available"}
                  </p>
                </div>
                <span className="hidden md:block text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>4.5 (1.2k ratings)</span>
                </div>
                <span className="hidden md:block text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <FaClock className="text-[#ff4d2d]" />
                  <span>30-40 min delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Sticky Shop Info Bar */}
      {shop && (
        <div className="sticky top-0 z-10 bg-[#fff9f6]/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between md:justify-around flex-wrap">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {shop.name}
          </h2>
          <div className="text-sm flex items-center gap-3 text-gray-600 mt-2 md:mt-0">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> 4.5
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-[#ff4d2d]" /> 30 mins
            </div>
            <div className="flex items-center gap-1">
              <FaUtensils className="text-[#ff4d2d]" /> {filteredItems.length} items
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Section */}
      {categories.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex overflow-x-auto gap-3 px-6 py-5 bg-[#fff4ed]/60 border-b border-[#ff4d2d]/10 scrollbar-hide"
        >
          {categories.map((cate, i) => (
            <button
              key={i}
              onClick={() => handleFilter(cate)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cate
                  ? "bg-[#ff4d2d] text-white shadow-md"
                  : "bg-white text-[#ff4d2d] border border-[#ff4d2d]/40 hover:bg-[#ff4d2d]/10"
              }`}
            >
              {cate}
            </button>
          ))}
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
            <FaUtensils className="text-[#ff4d2d]" /> Menu
          </h2>
          <div className="w-24 h-[3px] bg-[#ff4d2d] mx-auto mt-2 rounded-full" />
          <p className="text-gray-500 mt-2 text-sm">
            Explore freshly prepared dishes by <span className="text-[#ff4d2d]">{shop?.name}</span>
          </p>
        </motion.div>

        {/* Food Items Grid */}
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {filteredItems.map((item, index) => (
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
              No items found in this category 🍽️
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Shop;
