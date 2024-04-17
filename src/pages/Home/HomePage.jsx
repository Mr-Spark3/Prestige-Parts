import React from "react";
import VinDecoder from "../../components/VinDecoder";
import { motion } from "framer-motion";
import ImageSlider from "../../components/ImageSlider";
import ContactDealer from "../../components/ContactDealer";
import { BrowserRouter as Router } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="h-screen snap-start">
        <div className="h-12 w-full bg-red-500 border border-black">
          <h1 className="flex text-[#FFFFFF] text-3xl justify-center mx-auto tracking-[10px]">
            Prestige Parts
          </h1>
        </div>
        <div className="flex justify-center flex-col bg-custom-image h-[600px] w-[1100px] mx-auto overflow-y-scroll">
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
          <h1 className="text-3xl flex justify-center mt-10 tracking-[5px]">
            Brands
          </h1>
          <div className="flex justify-evenly border border-b-black">
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

        <motion.div
          className=""
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
          <div className="m-10 bg-black/20">
            <ImageSlider className="w-full h-full" />
          </div>
        </motion.div>

        <div>
          <h1 className="text-3xl flex justify-center mt-10 tracking-[5px]">
            Parts Department Hours
          </h1>
          <table className="table-auto mx-auto mt-10">
            <thead>
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Open</th>
                <th className="px-4 py-2">Closed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Monday</td>
                <td className="px-4 py-2">7:00AM</td>
                <td className="px-4 py-2">6:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Tuesday</td>
                <td className="px-4 py-2">7:00AM</td>
                <td className="px-4 py-2">6:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Wednesday</td>
                <td className="px-4 py-2">7:00AM</td>
                <td className="px-4 py-2">6:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Thursday</td>
                <td className="px-4 py-2">7:00AM</td>
                <td className="px-4 py-2">6:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Friday</td>
                <td className="px-4 py-2">7:00AM</td>
                <td className="px-4 py-2">6:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Saturday</td>
                <td className="px-4 py-2">8:00AM</td>
                <td className="px-4 py-2">5:00PM</td>
              </tr>
              <tr className="text-[#0096FF]">
                <td className="px-4 py-2">Sunday</td>
                <td className="px-4 py-2">Closed</td>
                <td className="px-4 py-2">Closed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <ContactDealer />
        </div>
      </div>
    </>
  );
}
