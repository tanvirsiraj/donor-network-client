import { useState } from "react";
import {
  FaBars,
  FaList,
  FaPlus,
  FaTimes,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import useRole from "../hooks/userRole";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../public/logo.png";
import "./Dashboard.css";

const Dashboard = () => {
  const { role, isLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-primaryColor text-white focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-primaryColor bg-opacity-20 backdrop-blur-sm
          transform transition-transform duration-300 ease-in-out
          z-30 p-4 pt-4 md:sticky md:top-0 md:translate-x-0 md:z-auto md:bg-transparent
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </Link>
        </div>

        <hr className="border-gray-300 my-2" />

        <ul className="menu space-y-2 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg pt-4 p-2 h-screen">
          {/* Dashboard Home */}
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-primaryColor text-white font-semibold"
                    : "text-gray-700 hover:bg-primaryColor hover:text-white"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUser /> <span>Dashboard Home</span>
            </NavLink>
          </li>

          {/* Profile */}
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-primaryColor text-white font-semibold"
                    : "text-gray-700 hover:bg-primaryColor hover:text-white"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUser /> <span>Profile</span>
            </NavLink>
          </li>

          {/* Donor Routes */}
          {role === "donor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaPlus /> <span>Create Donation Request</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-donation-request"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaList /> <span>My Donation Requests</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Volunteer Routes */}
          {role === "volunteer" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/all-blood-request"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaList /> <span>All Blood Request</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-managements-volunteer"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaList /> <span>Content Managements</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaUsers /> <span>All Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaList /> <span>All Donation Requests</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-primaryColor text-white font-semibold"
                        : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaBars /> <span>Content Management</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* Content Area */}
      <main
        className="flex-1 p-6 overflow-auto min-h-screen"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
