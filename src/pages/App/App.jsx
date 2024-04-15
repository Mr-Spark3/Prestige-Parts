import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../Home/HomePage";
import NavBar from "../../components/NavBar";
import "../../styles/globals.css";
import Header from "../../components/Header";
import OrderPage from "../OrderPage/OrderPage";
import TeamPage from "../../TeamPage/TeamPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (

    <main className="App">
      {user ? (
        <>
          <Header />
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
 
