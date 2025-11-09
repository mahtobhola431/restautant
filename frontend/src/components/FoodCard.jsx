// import React, { useState } from "react";
// import {
//   FaLeaf,
//   FaDrumstickBite,
//   FaStar,
//   FaMinus,
//   FaPlus,
//   FaShoppingCart,
// } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/userSlice";

// function FoodCard({ data }) {
//   const [quantity, setQuantity] = useState(0);
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.user);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         i <= rating ? (
//           <FaStar key={i} className="text-yellow-400 text-xs" />
//         ) : (
//           <FaRegStar key={i} className="text-yellow-400 text-xs" />
//         )
//       );
//     }
//     return stars;
//   };

//   const handleIncrease = () => setQuantity((prev) => prev + 1);
//   const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

//   const isInCart = cartItems.some((i) => i.id === data._id);

//   const handleAddToCart = () => {
//     if (quantity > 0) {
//       dispatch(
//         addToCart({
//           id: data._id,
//           name: data.name,
//           price: data.price,
//           image: data.image,
//           shop: data.shop,
//           quantity,
//           foodType: data.foodType,
//         })
//       );
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="relative w-[250px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden cursor-pointer"
//     >
//       {/* Image Section */}
//       <div className="relative w-full h-[160px] bg-gray-50">
//         {/* Veg / Non-veg icon */}
//         <div className="absolute top-3 right-3 bg-white/90 rounded-full p-[6px] shadow-sm">
//           {data.foodType === "veg" ? (
//             <FaLeaf className="text-green-600 text-sm" />
//           ) : (
//             <FaDrumstickBite className="text-red-500 text-sm" />
//           )}
//         </div>

//         {/* Food Image */}
//         <motion.img
//           src={data.image}
//           alt={data.name}
//           className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//           loading="lazy"
//         />
//       </div>

//       {/* Info Section */}
//       <div className="flex-1 flex flex-col p-3">
//         {/* Food Name */}
//         <h1 className="font-semibold text-gray-900 text-[15px] truncate">
//           {data.name}
//         </h1>

//         {/* Ratings */}
//         <div className="flex items-center gap-[2px] mt-1">
//           {renderStars(data.rating?.average || 0)}
//           <span className="text-[11px] text-gray-500 ml-1">
//             ({data.rating?.count || 0})
//           </span>
//         </div>

//         {/* Price + Quantity */}
//         <div className="flex items-center justify-between mt-3">
//           <span className="font-bold text-gray-900 text-[17px]">
//             ₹{data.price}
//           </span>

//           {/* Quantity Controls */}
//           <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
//             <button
//               className="px-[8px] py-[2px] hover:bg-gray-100 transition"
//               onClick={handleDecrease}
//             >
//               <FaMinus size={10} />
//             </button>
//             <span className="px-2 text-sm w-6 text-center">{quantity}</span>
//             <button
//               className="px-[8px] py-[2px] hover:bg-gray-100 transition"
//               onClick={handleIncrease}
//             >
//               <FaPlus size={10} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add to Cart Button */}
//       <motion.button
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.97 }}
//         onClick={handleAddToCart}
//         disabled={quantity === 0}
//         className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 ${
//           isInCart
//             ? "bg-gray-800 text-white"
//             : "bg-[#ff4d2d] text-white hover:bg-[#e63e1c]"
//         } disabled:opacity-60`}
//       >
//         <FaShoppingCart size={13} />
//         {isInCart ? "Added to Cart" : "Add to Cart"}
//       </motion.button>

//       {/* Added Notification Badge */}
//       <AnimatePresence>
//         {isInCart && (
//           <motion.div
//             key="added"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-2 left-2 bg-[#ff4d2d] text-white text-[11px] px-3 py-[2px] rounded-full shadow-md"
//           >
//              Added
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default FoodCard;


import React, { useState } from "react";
import {
  FaLeaf,
  FaDrumstickBite,
  FaStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { FaRegStar, FaFire } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isInCart = cartItems.some((i) => i.id === data._id);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

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

  const handleRedirectToShop = () => {
    if (data?.shop?._id) {
      navigate(`/shop/${data.shop._id}`);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 text-xs" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-xs" />
        )
      );
    }
    return stars;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="relative w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden cursor-pointer group"
      onClick={handleRedirectToShop}
    >
      {/* ================= Image Section ================= */}
      <div className="relative w-full h-[170px] overflow-hidden">
        {/* Food Image */}
        <motion.img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Overlay gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
        />

        {/* Veg / Non-veg icon */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-[6px] shadow-sm">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-sm" />
          ) : (
            <FaDrumstickBite className="text-red-500 text-sm" />
          )}
        </div>

        {/* Offer / Bestseller Tag */}
        {(data.isBestseller || data.offer) && (
          <span className="absolute top-3 left-3 bg-[#ff4d2d] text-white text-[11px] font-medium px-2 py-[2px] rounded-full shadow-sm flex items-center gap-1">
            <FaFire size={10} /> {data.isBestseller ? "Bestseller" : data.offer}
          </span>
        )}
      </div>

      {/* ================= Info Section ================= */}
      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          {/* Food Name */}
          <h1 className="font-semibold text-gray-900 text-[16px] leading-tight truncate">
            {data.name}
          </h1>

          {/* Shop Name */}
          {data?.shop?.name && (
            <p className="text-[13px] text-gray-500 mt-[2px] truncate">
              {data.shop.name}
            </p>
          )}

          {/* Ratings */}
          <div className="flex items-center gap-[3px] mt-2">
            {renderStars(data.rating?.average || 0)}
            <span className="text-[11px] text-gray-500 ml-1">
              ({data.rating?.count || 0})
            </span>
          </div>
        </div>

        {/* ================= Price + Quantity ================= */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900 text-[17px]">
            ₹{data.price}
          </span>

          {/* Quantity Controls */}
          <div
            className="flex items-center border border-gray-200 rounded-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent card redirect on quantity click
          >
            <button
              className="px-[8px] py-[2px] hover:bg-gray-100 transition"
              onClick={handleDecrease}
            >
              <FaMinus size={10} />
            </button>
            <span className="px-2 text-sm w-6 text-center">{quantity}</span>
            <button
              className="px-[8px] py-[2px] hover:bg-gray-100 transition"
              onClick={handleIncrease}
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= Add to Cart Button ================= */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent redirect on click
          handleAddToCart();
        }}
        disabled={quantity === 0}
        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 border-t ${
          isInCart
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-[#ff4d2d] text-white border-[#ff4d2d] hover:bg-[#e03e1c]"
        } disabled:opacity-60`}
      >
        <FaShoppingCart size={13} />
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </motion.button>

      {/* ================= Added Badge ================= */}
      <AnimatePresence>
        {isInCart && (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-2 bg-[#ff4d2d] text-white text-[11px] px-3 py-[2px] rounded-full shadow-md"
          >
            Added
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FoodCard;
