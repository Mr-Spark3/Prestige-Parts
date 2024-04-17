import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { parts } from "../Data/PartsData";

function PartsDisplay() {
  const [filteredParts, setFilteredParts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (filteredParts) => {
    setFilteredParts(filteredParts);
  };

  const addToCart = (part) => {
    console.log("Adding part to cart:", part);
    console.log("Current cart items:", cartItems);
    setCartItems([...cartItems, part]);
    console.log("Updated cart items:", cartItems);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="h-screen overflow-y-scroll bg-gradient-to-b ">
      <div className="flex justify-center border border-b-black">
        <SearchBar onSearch={handleSearch} />
      </div>
      <h1 className="flex justify-center mb-10 mt-10 text-xl font-semibold">
        Results:
      </h1>
      <div className="w-[800px] h-[300px] p-4 flex flex-col mx-auto space-y-8">
        {filteredParts.length > 0 ? (
          filteredParts.map((part, index) => (
            <div
              key={index}
              id={index}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={part.imagePath}
                alt={part.description}
                className="w-full h-40 object-cover mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-semibold">{part.description}</h2>
                  <p className="text-sm text-gray-500">
                    {part.make} {part.model} {part.year}
                  </p>
                </div>
                <p className="text-lg font-semibold">{part.Price}</p>
              </div>
              <p className="text-gray-600">{part.partNumber}</p>
              <div className="flex justify-end border border-black">
                <button
                  className="w-full h-full bg-green-400"
                  onClick={() => {
                    console.log("Add to cart button clicked");
                    addToCart(part);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No parts found</p>
        )}
      </div>
      {isCartOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div className="w-72 bg-white h-full shadow-lg">
            <button className="absolute top-0 right-5" onClick={toggleCart}>
              X
            </button>
            <div className="bottom-0 flex flex-col space-y-2 ml-7 absolute ">
              {cartItems.map((item, index) => (
                <div key={index} className="border p-2">
                  <p>{item.description}</p>
                  <p>{item.Price}</p>
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
  );
}

export default PartsDisplay;
