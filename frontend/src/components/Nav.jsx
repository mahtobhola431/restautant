import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true }
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) handleSearchItems();
    else dispatch(setSearchItems(null));
  }, [query]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-[9999] backdrop-blur-md bg-[#fff9f6]/70 shadow-md border-b border-[#ff4d2d]/10"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1300px] mx-auto h-[80px] flex items-center justify-between px-5 md:px-10">
        {/* Brand */}
        <motion.h1
          className="text-3xl font-extrabold text-[#ff4d2d] tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
        >
          Vingo
        </motion.h1>

        {/* Search Bar (Desktop) */}
        {userData.role === "user" && (
          <motion.div
            className="hidden md:flex items-center w-[45%] lg:w-[40%] bg-white/70 shadow-sm rounded-full overflow-hidden border border-gray-200"
            whileFocus={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2 px-3 border-r border-gray-300">
              <FaLocationDot className="text-[#ff4d2d]" size={20} />
              <span className="truncate text-gray-600 text-sm">{currentCity}</span>
            </div>
            <div className="flex items-center w-full px-3">
              <IoIosSearch className="text-[#ff4d2d]" size={22} />
              <input
                type="text"
                placeholder="Search delicious food..."
                className="px-2 py-2 w-full outline-none bg-transparent text-gray-700"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </motion.div>
        )}
        

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile Search */}
          {userData.role === "user" &&
            (showSearch ? (
              <RxCross2
                size={25}
                className="text-[#ff4d2d] md:hidden cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            ) : (
              <IoIosSearch
                size={25}
                className="text-[#ff4d2d] md:hidden cursor-pointer"
                onClick={() => setShowSearch(true)}
              />
            ))}

          {/* Owner Controls */}
          {userData.role === "owner" ? (
            <>
              {myShopData && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] hover:bg-[#ff4d2d]/20 transition-all font-medium"
                    onClick={() => navigate("/add-item")}
                  >
                    <FaPlus size={16} />
                    Add Food
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                    onClick={() => navigate("/add-item")}
                  >
                    <FaPlus size={18} />
                  </motion.button>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
                onClick={() => navigate("/my-orders")}
              >
                <TbReceipt2 size={18} />
                <span className="hidden md:block">My Orders</span>
              </motion.button>
            </>
          ) : (
            <>
              {/* Cart */}
              {userData.role === "user" && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <FiShoppingCart size={24} className="text-[#ff4d2d]" />
                  <motion.span
                    className="absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-[12px] w-5 h-5 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartItems.length}
                  </motion.span>
                </motion.div>
              )}

              {/* My Orders */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hidden md:block px-4 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </motion.button>
            </>
          )}

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-[42px] h-[42px] rounded-full bg-[#ff4d2d] text-white flex items-center justify-center shadow-lg font-semibold cursor-pointer select-none"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            {userData?.fullName?.[0]}
          </motion.div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-[85px] right-4 w-[200px] bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-gray-100`}
              >
                <div className="text-[16px] font-semibold text-gray-700">{userData.fullName}</div>
                {userData.role === "user" && (
                  <div
                    className="text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e03e1c] transition"
                    onClick={() => navigate("/my-orders")}
                  >
                    My Orders
                  </div>
                )}
                <div
                  className="text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e03e1c] transition"
                  onClick={handleLogOut}
                >
                  Log Out
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Search (Slide Down Animation) */}
      <AnimatePresence>
        {showSearch && userData.role === "user" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[80px] left-0 w-full bg-white shadow-lg px-5 py-4 flex items-center gap-3 md:hidden"
          >
            <FaLocationDot className="text-[#ff4d2d]" size={22} />
            <span className="text-gray-600 text-sm truncate">{currentCity}</span>
            <div className="flex items-center w-full">
              <IoIosSearch className="text-[#ff4d2d] mr-2" size={20} />
              <input
                type="text"
                placeholder="Search delicious food..."
                className="flex-1 outline-none text-gray-700"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Nav;
