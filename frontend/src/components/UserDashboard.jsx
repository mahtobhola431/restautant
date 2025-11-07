import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(
    (state) => state.user
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);

  const handleFilterByCategory = (category) => {
    if (category === "All") setUpdatedItemsList(itemsInMyCity);
    else {
      const filteredList = itemsInMyCity?.filter((i) => i.category === category);
      setUpdatedItemsList(filteredList);
    }
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (cateScrollRef.current && shopScrollRef.current) {
      const updateAll = () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      };
      updateAll();

      cateScrollRef.current.addEventListener("scroll", updateAll);
      shopScrollRef.current.addEventListener("scroll", updateAll);

      return () => {
        cateScrollRef.current?.removeEventListener("scroll", updateAll);
        shopScrollRef.current?.removeEventListener("scroll", updateAll);
      };
    }
  }, [categories]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fff9f6] to-[#fff3ee] flex flex-col items-center overflow-y-auto">
      <Nav />

      {/* Search Results */}
      <AnimatePresence>
        {searchItems && searchItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-6xl mt-24 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-5"
          >
            <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2">
              Search Results
            </h1>
            <div className="w-full flex flex-wrap gap-6 justify-center">
              {searchItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FoodCard data={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-6xl mt-6 px-4 flex flex-col gap-5 items-start"
      >
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
          🍽️ Inspiration for your first order
        </h1>

        <div className="w-full relative">
          {showLeftCateButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-3 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCircleChevronLeft size={22} />
            </motion.button>
          )}

          <div
            className="flex overflow-x-auto gap-5 scrollbar-hide pb-3"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CategoryCard
                  name={cate.category}
                  image={cate.image}
                  onClick={() => handleFilterByCategory(cate.category)}
                />
              </motion.div>
            ))}
          </div>

          {showRightCateButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-3 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCircleChevronRight size={22} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Shops */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-6xl px-4 flex flex-col gap-5 items-start mt-8"
      >
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
          🏪 Best Shops in {currentCity}
        </h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-3 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaCircleChevronLeft size={22} />
            </motion.button>
          )}

          <div
            className="flex overflow-x-auto gap-5 scrollbar-hide pb-3"
            ref={shopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CategoryCard
                  name={shop.name}
                  image={shop.image}
                  onClick={() => navigate(`/shop/${shop._id}`)}
                />
              </motion.div>
            ))}
          </div>

          {showRightShopButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-3 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCircleChevronRight size={22} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Suggested Food Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-6xl px-4 flex flex-col gap-6 items-start mt-10 mb-10"
      >
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
          🍕 Suggested Food Items
        </h1>
        <div className="w-full flex flex-wrap gap-6 justify-center">
          {updatedItemsList?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FoodCard data={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default UserDashboard;
