import { Link, NavLink } from "react-router-dom";
import logo from "../../../../public/logo.png";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
const Navbar = () => {
  const { user, logOut, loading} = useAuth();
  console.log(user, "user in navbar");

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };


  const links = (
    <div className="flex items-center">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donationRequests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>

      {loading ? null :user ? (
        <>
          <li>
            <NavLink to="/funding">Funding</NavLink>
          </li>
          <div className="dropdown dropdown-end dropdown-hover ">
            <div tabIndex={0} role="button" className="">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Avatar"
                className="w-12 h-12 rounded-full cursor-pointer "
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 p-4  shadow pt-4 space-y-4"
            >
              <Link to="/dashboard" className=" hover:bg-gray-100 rounded-t-lg">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-primaryColor text-white hover:bg-red-500 hover:text-white text-lg font-semibold w-fit px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </ul>
          </div>
        </>
      ) : (
        <li>
          <Link
            className="bg-primaryColor text-white ml-2 hover:bg-primaryColor hover:text-white text-md font-semibold"
            to="/login"
          >
            Login
          </Link>
        </li>
      )}
    </div>
  );
  return (
    <div className="bg-white shadow-lg py-2 fixed w-full top-0 z-50 px-4">
      <div className="navbar bg-base-100 max-w-7xl mx-auto px-2 lg:px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img className="w-[40px] h-[40px]" src={logo} alt="" />
            <span className="text-xl font-bold leading-5">
              <span className="text-primaryColor">Donor</span> <br /> Network
            </span>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal  p-0 ">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
