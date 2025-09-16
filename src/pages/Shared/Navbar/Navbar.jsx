import { Link, NavLink } from "react-router-dom";
import logo from "../../../../public/logo.png";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li className="text-base lg:text-lg">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-base lg:text-lg">
        <NavLink to="/donationRequests">Donation Requests</NavLink>
      </li>
      <li className="text-base lg:text-lg">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="text-base lg:text-lg">
        <NavLink to="/search">Search</NavLink>
      </li>
      {user && (
        <li className="text-base lg:text-lg">
          <NavLink to="/funding">Funding</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto  px-4  py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10" src={logo} alt="logo" />
          <span className="text-xl font-bold leading-5">
            <span className="text-primaryColor">Donor</span>
            <br /> Network
          </span>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center font-medium">
          {navLinks}
          {!loading && user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white shadow rounded-box w-52 mt-2 p-2 space-y-2"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-primaryColor text-white hover:bg-red-500 w-full py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryColor/90 "
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4">
          <ul className="space-y-2 font-medium">{navLinks}</ul>
          {!loading && user ? (
            <div className="mt-4 space-y-2">
              <Link to="/dashboard" className="block text-sm">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primaryColor text-white w-full py-2 rounded hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block mt-4 bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryColor/90"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
