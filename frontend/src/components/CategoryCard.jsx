



import React from "react";
import { motion } from "framer-motion";

function CategoryCard({ name, image, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="flex-shrink-0 w-[110px] sm:w-[130px] md:w-[150px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer group transition-all duration-300"
    >
      {/* Category Image */}
      <div className="relative w-full h-[100px] sm:h-[120px] md:h-[130px] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        {/* Fade gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 opacity-70 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Category Label */}
      <div className="text-center py-2 bg-white">
        <p className="text-[14px] sm:text-[15px] font-semibold text-gray-800 tracking-tight capitalize group-hover:text-[#ff4d2d] transition-colors duration-300">
          {name}
        </p>
      </div>
    </motion.div>
  );
}

export default CategoryCard;
