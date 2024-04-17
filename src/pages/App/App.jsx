import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../Home/HomePage";
import NavBar from "../../components/NavBar";
import "../../styles/globals.css";
import Header from "../../components/Header";
import OrderPage from "../OrderPage/OrderPage";
import TeamPage from "../../TeamPage/TeamPage";
import PartDisplay from "../../PartDisplay/PartDisplay";
import SearchBar from "../../components/SearchBar";
import { parts } from "../../Data/PartsData";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [filteredParts, setFilteredParts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (filteredPartsData) => {
    setFilteredParts(filteredPartsData);
  };

  const addToCart = (part) => {
    const { description, Price, ...rest } = part; 
    setCartItems((prevCartItems) => [...prevCartItems, { description, Price, ...rest }]);
    console.log("Adding part to cart:", part);
    console.log("Current cart items:", cartItems);
  };
  return (
    <main className="App">
      {user ? (
        <>
          <Header />
          <NavBar user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} />
          <Routes>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/parts" element={<PartDisplay parts={filteredParts} addToCart={addToCart} />} />
          </Routes>
          
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}