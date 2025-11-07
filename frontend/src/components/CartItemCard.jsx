import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice";

function CartItemCard({ data }) {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image + Details */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200"
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <div>
          <h1 className="font-semibold text-gray-900 text-sm md:text-base">
            {data.name}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            ₹{data.price} × {data.quantity}
          </p>
          <motion.p
            key={data.quantity}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-gray-800 mt-1"
          >
            ₹{data.price * data.quantity}
          </motion.p>
        </div>
      </div>

      {/* Quantity + Actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => handleDecrease(data.id, data.quantity)}
          className="p-2 cursor-pointer bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
        >
          <FaMinus size={12} />
        </motion.button>

        <motion.span
          key={data.quantity}
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-gray-800"
        >
          {data.quantity}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => handleIncrease(data.id, data.quantity)}
          className="p-2 cursor-pointer bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
        >
          <FaPlus size={12} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(removeCartItem(data.id))}
          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
        >
          <CiTrash size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CartItemCard;
