import React, { useState } from "react";
import {
  FaLeaf,
  FaDrumstickBite,
  FaStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-sm" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const isInCart = cartItems.some((i) => i.id === data._id);

  const handleAddToCart = () => {
    
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity,
          foodType: data.foodType,
        })
      );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="w-[250px] rounded-2xl bg-white/90 backdrop-blur-sm shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-[180px] bg-white overflow-hidden">
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1 shadow-md">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-500 text-lg" />
          )}
        </div>

        <motion.img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col p-4">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>

        {/* Star Ratings */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-500 ml-1">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900 text-lg">
            ₹{data.price}
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
            <button
              className="px-2 py-1 hover:bg-gray-100 transition"
              onClick={handleDecrease}
            >
              <FaMinus size={12} />
            </button>
            <span className="px-2 text-sm w-6 text-center">{quantity}</span>
            <button
              className="px-2 py-1 hover:bg-gray-100 transition"
              onClick={handleIncrease}
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={quantity === 0}
        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${
          isInCart
            ? "bg-gray-800 text-white"
            : "bg-[#ff4d2d] text-white hover:bg-[#e63e1c]"
        } disabled:opacity-60`}
      >
        <FaShoppingCart />
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </motion.button>

      {/* Added to Cart Animation */}
      <AnimatePresence>
        {isInCart && (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 left-2 bg-[#ff4d2d] text-white text-xs px-3 py-1 rounded-full shadow-md"
          >
            ✅ Added
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FoodCard;
