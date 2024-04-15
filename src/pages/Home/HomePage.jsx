import React from "react";
import VinDecoder from "../../components/VinDecoder";
import { motion } from "framer-motion";
import ImageSlider from "../../components/ImageSlider";

export default function HomePage() {
  return (
    <>
      <div className="h-screen snap-start">
        <div className="h-12 w-full bg-red-500 border border-black">
          <h1 className="flex text-[#FFFFFF] text-3xl justify-center mx-auto tracking-[10px]">
            Prestige Parts
          </h1>
        </div>
        <div className="flex justify-center flex-col bg-custom-image h-[800px] mx-auto overflow-y-scroll">
          <div>
            <VinDecoder className="border border-black text-blue-600 z-20" />
            
          </div>
        </div>

        <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        >
          <h1 className="text-3xl flex justify-center mt-10 tracking-[5px]">Brands</h1>
          <div className="flex justify-evenly">
            <div>
              <img src="/images/chryslerlogo.webp" alt="Chrysler" />
            </div>  
            <div> 
              <img src="/images/dodgelogo.webp" alt="Dodge" />
            </div>  
            <div>
              <img src="/images/ramlogo.webp" alt="Ram" />
            </div>
            <div>
              <img src="/images/wagoneer.webp" alt="Wagoneer" />
            </div>
          </div>
        </motion.div>

        <div>
          <ImageSlider className="image-slider"/>
        </div>
      </div>
    </>
  );
}