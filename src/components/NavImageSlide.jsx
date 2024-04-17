import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/chryslerlogo.webp",
  "/images/dodgelogo.webp",
  "/images/ramlogo.webp",
  "/images/jeeplogo.webp"

];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function NavImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  useInterval(() => {
    nextImage();
  }, 5000);

  return (
    <div className="w-12 h-12 flex justify-center object-cover filter brightness-100 contrast-100 shadow-lg mr-10 ml-10">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
}

export default NavImageSlider;