import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/TireDeal.png",
  "/images/GC4xe.avif",
  "/images/BuyCar.webp"
];

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="image-slider">
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
      <button onClick={nextImage}>Next Image</button>
    </div>
  );
}

export default ImageSlider;