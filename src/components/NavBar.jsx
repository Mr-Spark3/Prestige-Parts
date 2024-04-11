import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";
import { ShoppingCartIcon, Bars3Icon } from "@heroicons/react/24/solid";

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
      <div>

      </div>

      <div className="w-48">
        <Link to="/" className="">
          <img src="/images/Prestigelogo.webp" className="w-full h-full"></img>
        </Link>
      </div>

      <div className="flex mx-auto gap-12 ">
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
      </div>

      <div>
        <Link to="" onClick={handleLogOut}>
          Log Out{" "}
        </Link>
      </div>
    </nav>
  );
}

{
  /* <div className="flex">
<Link to="/orders/new">
  <div className="h-7 w-7">
    <ShoppingCartIcon className="w-full h-full" />
  </div>
</Link>

<div className="h-7 w-7">
  <Bars3Icon className="w-full h-full" />
  <ul className="hidden">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>

// {/* <span>Welcome, {user && user.name}</span> */
}
// <Link to="" onClick={handleLogOut}>
//   Log Out
// </Link>
// </div> */}
