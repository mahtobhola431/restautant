"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    city: "Mumbai, Maharashtra",
    feedback:
      "Vingo has completely changed the way I discover new restaurants! The delivery is super fast, and the UI is so smooth.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    city: "Delhi, NCR",
    feedback:
      "Absolutely love how easy it is to browse and order food. The offers are great, and the design feels premium.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Das",
    city: "Bangalore, Karnataka",
    feedback:
      "I use Vingo almost daily! The real-time tracking and restaurant ratings make it super convenient for me.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Iyer",
    city: "Chennai, Tamil Nadu",
    feedback:
      "Great experience every time! The platform looks stunning and it really feels like a premium food app.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="w-full bg-[#fff9f6] py-20 px-6 md:px-10 flex flex-col items-center">
      {/* Header */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Loved Across Pan India 🇮🇳
      </motion.h2>
      <p className="text-gray-600 text-center max-w-xl mb-12">
        From bustling cities to small towns — people everywhere are enjoying
        delicious meals with <span className="text-[#ff4d2d] font-semibold">Vingo</span>.
      </p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 transition-all duration-300 border border-gray-100 flex flex-col items-start relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <FaQuoteLeft className="absolute top-5 right-6 text-[#ff4d2d]/10 text-5xl" />
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#ff4d2d]/40"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.city}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {t.feedback}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Tagline */}
      <motion.div
        className="mt-14 bg-[#ff4d2d]/10 px-6 py-3 rounded-full text-[#ff4d2d] font-medium shadow-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Join 1,00,000+ happy customers ordering via <span className="font-semibold">Vingo</span>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
