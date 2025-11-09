import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import HeroCarousel from "../components/HeroSection";
import TestimonialSection from "../components/TestimonialSection"; 


import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const banners = [
  {
    image: banner1,
    title: "Discover Your City’s Best Food 🍔",
    subtitle: "Order from your favorite restaurants near you!",
    ctaText: "Explore Now",
    onClick: () => console.log("Explore clicked!"),
  },
  {
    image: banner2,
    title: "Hot Deals & Discounts 🔥",
    subtitle: "Save more on every meal — limited time only!",
    ctaText: "Grab Offer",
    onClick: () => console.log("Offer clicked!"),
  },
  {
    image: banner3,
    title: "Fast Delivery 🚀",
    subtitle: "Get your meal delivered hot & fresh in 30 minutes!",
    ctaText: "Order Now",
    onClick: () => console.log("Order clicked!"),
  },
];

function Home() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-[100vw] min-h-[100vh] pt-[80px] flex flex-col items-center bg-[#fff9f6]">
      {/* 🌟 Hero Carousel visible for everyone */}
      <HeroCarousel banners={banners} />

      {/* 👤 Dashboards (only for logged-in users) */}
      {userData?.role === "user" && (
        <>
          <UserDashboard />
          {/* 🧡 Testimonials appear below user dashboard */}
          <TestimonialSection />
        </>
      )}
      {userData?.role === "owner" && <OwnerDashboard />}
      {userData?.role === "deliveryBoy" && <DeliveryBoy />}

      {/* If user not logged in, still show testimonials */}
      {!userData && <TestimonialSection />}
    </div>
  );
}

export default Home;
