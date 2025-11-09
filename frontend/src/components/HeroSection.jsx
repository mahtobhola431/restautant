import React, { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function HeroCarousel({ banners }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayRef = useRef(null);
  const progressRef = useRef(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const autoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    clearInterval(progressRef.current);
    if (!emblaApi) return;

    const idx = emblaApi.selectedScrollSnap();
    setCurrentIndex(idx);
    setProgress(0);

    const duration = 4000; // 4 seconds per slide
    const start = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 50);

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, duration);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", autoplay);
    autoplay();
    return () => {
      clearInterval(autoplayRef.current);
      clearInterval(progressRef.current);
    };
  }, [emblaApi, autoplay]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-[50vh]">
              <img
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <motion.h1
                  className="text-3xl md:text-6xl font-extrabold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {banner.title || "Discover Your City’s Best Food"}
                </motion.h1>
                {banner.subtitle && (
                  <motion.p
                    className="text-lg md:text-2xl text-gray-200 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {banner.subtitle}
                  </motion.p>
                )}
                {banner.ctaText && (
                  <motion.button
                    className="px-8 py-3 bg-[#ff4d2d] rounded-full font-semibold shadow-lg hover:bg-[#e64323] transition-transform hover:scale-105"
                    whileTap={{ scale: 0.95 }}
                    onClick={banner.onClick}
                  >
                    {banner.ctaText}
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full hover:bg-white shadow-md"
          >
            <ChevronLeft className="text-gray-800" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full hover:bg-white shadow-md"
          >
            <ChevronRight className="text-gray-800" />
          </button>
        </>
      )}

      {/* Progress dots */}
      {banners.length > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`relative h-[6px] rounded-full overflow-hidden transition-all duration-300 ${
                currentIndex === i ? "w-[32px]" : "w-[16px]"
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gray-400/50 rounded-full"></div>
              {currentIndex === i && (
                <div
                  className="absolute top-0 left-0 h-full bg-[#ff4d2d] rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 50ms linear",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
