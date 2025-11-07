// OwnerItemCard.jsx
import axios from "axios";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Delete "${data.name}" permanently? This action cannot be undone.`
    );
    if (!confirm) return;

    try {
      setLoading(true);
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true }
      );
      // update owner shop data in redux
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.error("Delete item error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="w-full max-w-2xl bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden flex"
    >
      {/* Image */}
      <div className="w-36 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white">
        <img
          src={data.image}
          alt={data.name || "food item"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-[#ff4d2d]">{data.name}</h3>
            <div className="text-sm font-semibold text-gray-700">₹{data.price}</div>
          </div>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium text-gray-800">Category:</span>{" "}
              <span className="text-gray-600">{data.category}</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">Food Type:</span>{" "}
              <span className="text-gray-600">{data.foodType}</span>
            </div>
            {data.description && (
              <p className="mt-2 text-xs text-gray-500 line-clamp-2">{data.description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/edit-item/${data._id}`)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg border border-[#ff4d2d]/20 text-[#ff4d2d] bg-white hover:bg-[#ff4d2d]/5 transition"
              aria-label={`Edit ${data.name}`}
            >
              <FaPen size={14} />
              <span className="text-sm hidden sm:inline">Edit</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e63e1c] transition disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={`Delete ${data.name}`}
            >
              {loading ? (
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <FaTrashAlt size={14} />
              )}
              <span className="text-sm">Delete</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default OwnerItemCard;
