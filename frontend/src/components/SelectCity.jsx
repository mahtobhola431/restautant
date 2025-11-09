
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCurrentCity } from "../redux/userSlice";

function SelectCity({ isOpen, onClose }) {
  const [manualCity, setManualCity] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // 🌍 Detect current location
  const handleDetectLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocode
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
        );
        const data = await response.json();
        const city =
          data?.results?.[0]?.components?.city ||
          data?.results?.[0]?.components?.town ||
          data?.results?.[0]?.components?.village ||
          "Unknown";

        dispatch(setCurrentCity(city));
        setLoading(false);
        onClose();
      },
      (error) => {
        alert("Failed to fetch location.");
        console.log(error);
        setLoading(false);
      }
    );
  };

  // 🏙️ Set manual city
  const handleManualSubmit = () => {
    if (manualCity.trim().length === 0) return;
    dispatch(setCurrentCity(manualCity));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
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
              onClick={handleDetectLocation}
              disabled={loading}
              className="w-full py-3 bg-[#ff4d2d] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e04023] transition mb-4"
            >
              <FaLocationDot />
              {loading ? "Detecting..." : "Detect My Location"}
            </button>

            <div className="relative mb-4">
              <IoLocationSharp className="absolute left-3 top-3 text-[#ff4d2d]" />
              <input
                type="text"
                placeholder="Enter city manually"
                className="pl-10 w-full border rounded-lg py-2 outline-none"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
              />
            </div>

            <button
              onClick={handleManualSubmit}
              className="w-full py-2 border border-[#ff4d2d] text-[#ff4d2d] rounded-lg hover:bg-[#ff4d2d]/10 transition"
            >
              Confirm City
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SelectCity;
