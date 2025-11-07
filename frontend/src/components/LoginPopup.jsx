import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginPopup } from "../redux/userSlice";

function LoginPopup() {
  const dispatch = useDispatch();
  const { showLoginPopup } = useSelector((state) => state.user);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!showLoginPopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-2xl overflow-hidden"
        >
          <button
            onClick={() => dispatch(toggleLoginPopup(false))}
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>

          {showSignUp ? (
            <SignUp switchMode={() => setShowSignUp(false)} />
          ) : (
            <SignIn switchMode={() => setShowSignUp(true)} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LoginPopup;
