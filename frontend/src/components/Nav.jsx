import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import {
  setSearchItems,
  setUserData,
  setCurrentCity,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.owner);

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showCityModal, setShowCityModal] = useState(false);
  const [manualCity, setManualCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const dropdownRef = useRef(null);
  const infoRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTimeout = useRef();

  // ---------- Close dropdowns on outside click ----------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- LOGOUT ----------
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- SEARCH (Debounced + Suggestions) ----------
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      dispatch(setSearchItems(null));
      return;
    }

    clearTimeout(searchTimeout.current);
    setLoadingSearch(true);

    searchTimeout.current = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
          { withCredentials: true }
        );
        setSuggestions(data);
        dispatch(setSearchItems(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSearch(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout.current);
  }, [query, currentCity]);

  // ---------- DETECT CITY ----------
  const detectCityAutomatically = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown City";
          dispatch(setCurrentCity(detectedCity));
          setShowCityModal(false);
        } catch (err) {
          alert("Failed to detect city.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        alert("Please allow location access in your browser settings.");
        setLoadingLocation(false);
      }
    );
  };

  // ---------- MANUAL CITY ----------
  const handleManualCitySubmit = () => {
    if (!manualCity.trim()) return;
    dispatch(setCurrentCity(manualCity.trim()));
    setShowCityModal(false);
    setManualCity("");
  };

  // ---------- CLEAR SEARCH ----------
  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    dispatch(setSearchItems(null));
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[9999] backdrop-blur-md bg-[#fff9f6]/70 shadow-md border-b border-[#ff4d2d]/10"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[1300px] mx-auto h-[80px] flex items-center justify-between px-5 md:px-10 relative">
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
            <div
              className="relative hidden md:flex items-center w-[45%] lg:w-[40%] bg-white/70 shadow-sm rounded-full border border-gray-200 px-3"
              ref={dropdownRef}
            >
              <FaLocationDot className="text-[#ff4d2d]" size={20} />
              <span className=" text-gray-600 text-sm ml-2">
                {currentCity || "Select City"}
              </span>
              <button
                onClick={() => setShowCityModal(true)}
                className="text-xs text-[#ff4d2d] underline ml-2"
              >
                Change
              </button>

              <div className="flex items-center w-full px-3">
                <IoIosSearch className="text-[#ff4d2d]" size={22} />
                <input
                  type="text"
                  placeholder={`Search food in ${currentCity || "your city"}...`}
                  className="px-2 py-2 w-full outline-none bg-transparent text-gray-700"
                  value={query}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <RxCross2
                    className="cursor-pointer text-gray-500 hover:text-[#ff4d2d]"
                    size={20}
                    onClick={clearSearch}
                  />
                )}
              </div>

              {/* Dropdown suggestions */}
              <AnimatePresence>
                {showDropdown &&
                  (loadingSearch ||
                    suggestions.length > 0 ||
                    query.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {loadingSearch ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          Searching...
                        </div>
                      ) : suggestions.length > 0 ? (
                        suggestions.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 hover:bg-[#ff4d2d]/10 cursor-pointer transition"
                            onClick={() => {
                              navigate(`/shop/${item.shop?._id}`);
                              setShowDropdown(false);
                              clearSearch();
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div className="flex flex-col">
                              <span className="text-gray-800 font-medium truncate">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500 truncate">
                                {item.shop?.name}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400 text-sm">
                          No results found
                        </div>
                      )}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          )}

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4 relative" ref={infoRef}>
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

            {/* Profile Icon */}
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
                  className="absolute top-[70px] right-0 w-[200px] bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-gray-100"
                >
                  <div className="text-[16px] font-semibold text-gray-700 border-b pb-2">
                    {userData.fullName}
                  </div>
                  {userData.role === "user" && (
                    <div
                      className="text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e03e1c] transition"
                      onClick={() => {
                        navigate("/my-orders");
                        setShowInfo(false);
                      }}
                    >
                      My Orders
                    </div>
                  )}
                  {userData.role === "owner" && (
                    <div
                      className="text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e03e1c] transition"
                      onClick={() => {
                        navigate("/my-orders");
                        setShowInfo(false);
                      }}
                    >
                      View Orders
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
      </motion.nav>

      {/* City Modal */}
      <AnimatePresence>
        {showCityModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Choose Your City
              </h2>

              <button
                onClick={detectCityAutomatically}
                disabled={loadingLocation}
                className="w-full py-3 bg-[#ff4d2d] text-white rounded-lg font-medium hover:bg-[#e04023] transition mb-4"
              >
                {loadingLocation ? "Detecting..." : "Detect My Location"}
              </button>

              <input
                type="text"
                placeholder="Enter city manually"
                className="w-full border rounded-lg py-2 px-3 outline-none mb-3"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
              />

              <div className="flex gap-3">
                <button
                  onClick={handleManualCitySubmit}
                  className="flex-1 py-2 bg-[#ff4d2d]/10 text-[#ff4d2d] rounded-lg font-medium hover:bg-[#ff4d2d]/20 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowCityModal(false);
                    setLoadingLocation(false);
                  }}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
