import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#fff9f6] border-t border-gray-200 mt-10">
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">

        {/* Brand Info */}
        <div>
          <h1 className="text-3xl font-bold text-[#ff4d2d] mb-3">Vingo</h1>
          <p className="text-sm leading-6">
            Vingo connects you with your favorite restaurants in your city.
            Discover, order, and enjoy your meals effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-[#ff4d2d] mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/my-orders")}>My Orders</li>
            <li className="hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/cart")}>Cart</li>
            <li className="hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signin")}>Sign In</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-[#ff4d2d] mb-3">Follow Us</h2>
          <div className="flex gap-4 text-[#ff4d2d]">
            <a href="#" className="p-2 rounded-full bg-[#ff4d2d]/10 hover:bg-[#ff4d2d] hover:text-white transition-all"><FaFacebookF /></a>
            <a href="#" className="p-2 rounded-full bg-[#ff4d2d]/10 hover:bg-[#ff4d2d] hover:text-white transition-all"><FaInstagram /></a>
            <a href="#" className="p-2 rounded-full bg-[#ff4d2d]/10 hover:bg-[#ff4d2d] hover:text-white transition-all"><FaTwitter /></a>
            <a href="#" className="p-2 rounded-full bg-[#ff4d2d]/10 hover:bg-[#ff4d2d] hover:text-white transition-all"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-[#ff4d2d] font-semibold">Vingo</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
