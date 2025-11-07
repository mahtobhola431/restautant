import React from "react";
import { motion } from "framer-motion";

function CategoryCard({ name, image, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="relative w-[130px] h-[130px] md:w-[180px] md:h-[180px] rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
    >
      {/* Category Image */}
      <motion.img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

      {/* Floating Label */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-orange-100 text-center py-2 px-3"
      >
        <motion.p
          className="text-sm md:text-base font-semibold text-gray-800 tracking-wide capitalize group-hover:text-[#ff4d2d] transition-colors duration-300"
          whileHover={{ y: -2 }}
        >
          {name}
        </motion.p>
      </motion.div>

      {/* Soft glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#ff4d2d]/40 group-hover:shadow-[0_0_25px_rgba(255,77,45,0.4)] transition-all duration-300"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default CategoryCard;
