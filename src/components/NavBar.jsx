import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import NavImageSlider from "./NavImageSlide";

export default function NavBar({ user, setUser, cartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-full h-50 flex sticky p-4 mx-auto top-0 z-20 md:items-center lg:items-center xl:items-center border border-black/30 space-between bg-[#FFFFFF]">
      <div>
        <NavImageSlider className="h-full w-full" />
      </div>

      <div className="w-48">
        <Link to="/" className="">
          <img src="/images/Prestigelogo.webp" className="w-full h-full"></img>
        </Link>
      </div>

      <motion.div
        className="flex mx-auto gap-12 "
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <div className="hover:text-blue-500">
          <Link to="/categories">
            <button className="uppercase font-bold w-full h-full">
              Categories
            </button>
          </Link>
        </div>
        &nbsp; | &nbsp;
        <div className="hover:text-blue-500">
          <Link to="/orders">
            <button className="uppercase font-bold w-full h-full">
              Orders
            </button>
          </Link>
        </div>
        &nbsp; | &nbsp;
        <div className="hover:text-blue-500">
          <Link to="/team">
            <button className="uppercase font-bold w-full h-full">
              Meet The Team
            </button>
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-row relative">
        <button onClick={toggleCart}>
          <ShoppingCartIcon className="w-7 h-7 mr-5" />
        </button>
        <Link to="" onClick={handleLogOut}>
          Log Out{" "}
        </Link>
        {isCartOpen && (
          <div className="fixed inset-0 flex justify-end z-50">
            <div className="w-72 bg-black bg-opacity-60 h-full shadow-lg">
              <h1 className="flex justify-center text-white font-semibold mt-10">
                Cart Items:
              </h1>
              <button className="absolute top-0 right-5 text-white" onClick={toggleCart}>
                X
              </button>
              <div className="bottom-0 flex flex-col space-y-2 ml-7 absolute ">
                {cartItems.map((part, index) => (
                  <div
                    key={index}
                    className="border p-2 flex justify-between items-center"
                  >
                    <div>
                      <p>{part.description}</p>
                      <p>{part.Price}</p>
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => {
                        
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button className="border border-black bg-blue-400 p-2">
                    Save Order
                  </button>
                  <button className="border border-black bg-blue-400 p-2">
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
