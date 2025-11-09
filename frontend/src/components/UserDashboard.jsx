

import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";
import SelectCity from "./SelectCity";

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(
    (state) => state.user
  );
  const [showCityModal, setShowCityModal] = useState(false);
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();

  const [updatedItemsList, setUpdatedItemsList] = useState(itemsInMyCity || []);
  const [showCateBtns, setShowCateBtns] = useState({ left: false, right: false });
  const [showShopBtns, setShowShopBtns] = useState({ left: false, right: false });

  // Filter items by category
  const handleFilterByCategory = (category) => {
    if (category === "All") setUpdatedItemsList(itemsInMyCity);
    else {
      const filteredList = itemsInMyCity?.filter((i) => i.category === category);
      setUpdatedItemsList(filteredList);
    }
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  // Update left/right scroll button visibility
  const updateButtons = (ref, setButtons) => {
    const el = ref.current;
    if (el) {
      setButtons({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth,
      });
    }
  };

  // Handle scroll with smooth animation
  const scrollHandler = (ref, dir) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
  if (!currentCity) {
    setShowCityModal(true);
  }
}, [currentCity]);

  // Attach scroll listeners for updating arrows
  useEffect(() => {
    const update = () => {
      updateButtons(cateScrollRef, setShowCateBtns);
      updateButtons(shopScrollRef, setShowShopBtns);
    };
    update();
    cateScrollRef.current?.addEventListener("scroll", update);
    shopScrollRef.current?.addEventListener("scroll", update);

    return () => {
      cateScrollRef.current?.removeEventListener("scroll", update);
      shopScrollRef.current?.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fff9f6] flex flex-col items-center">
      <Nav />

      {/* ====================== Categories Section ====================== */}
      <div className="w-full max-w-6xl mt-8 px-4 flex flex-col gap-4 items-start">
        <h1 className="text-gray-900 text-[22px] font-semibold tracking-tight flex items-center gap-2">
          🍽️ <span>Inspiration for your first order</span>
        </h1>

        <div className="relative w-full">
          {showCateBtns.left && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 z-10"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>
          )}

          <div
            ref={cateScrollRef}
            className="flex overflow-x-auto gap-4 pb-3 scrollbar-hide scroll-smooth"
          >
            {categories.map((cate, index) => (
              <CategoryCard
                key={index}
                name={cate.category}
                image={cate.image}
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>

          {showCateBtns.right && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 z-10"
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* ====================== Shops Section ====================== */}
      <div className="w-full max-w-6xl px-4 flex flex-col gap-4 items-start mt-10">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-gray-900 text-[22px] font-semibold tracking-tight">
            🏪 Best Restaurants in {currentCity || "Your City"}
          </h1>
          <button className="text-[#ff4d2d] font-medium hover:underline">
            See all
          </button>
        </div>

        <div className="relative w-full">
          {showShopBtns.left && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 z-10"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>
          )}

          <div
            ref={shopScrollRef}
            className="flex overflow-x-auto gap-5 pb-3 scrollbar-hide scroll-smooth"
          >
            {shopInMyCity?.map((shop) => (
              <div
                key={shop._id}
                onClick={() => navigate(`/shop/${shop._id}`)}
                className="w-[250px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex-shrink-0"
              >
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-[160px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-lg truncate">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {shop.address || currentCity}
                  </p>
                  <p className="text-[#ff4d2d] font-medium mt-1 text-sm">
                    30% Off + 25% Off
                  </p>
                </div>
              </div>
            ))}
          </div>

          {showShopBtns.right && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 z-10"
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          )}
        </div>
      </div>

      <SelectCity isOpen={showCityModal} onClose={() => setShowCityModal(false)} />


      {/* ====================== Suggested Food Items ====================== */}
      <div className="w-full max-w-6xl px-4 flex flex-col gap-5 items-start mt-10 mb-10">
        <h1 className="text-gray-900 text-[22px] font-semibold tracking-tight">
          🍕 Suggested Food Items
        </h1>
        <div className="flex flex-wrap gap-6 justify-start w-full">
          {updatedItemsList?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
