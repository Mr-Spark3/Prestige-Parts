import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";
import { ShoppingCartIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav
      className="w-full h-50 flex sticky p-4 mx-auto top-0 z-20 md:items-center lg:items-center xl:items-center
    border border-black/30 space-between bg-[#FFFFFF]"
    >
      <div></div>

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

      <div>
        <Link to="" onClick={handleLogOut}>
          Log Out{" "}
        </Link>
      </div>
    </nav>
  );
}
