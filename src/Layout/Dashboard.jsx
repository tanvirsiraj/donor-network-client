import { useState } from "react";
import { FaBars, FaList, FaPlus, FaTimes, FaUsers, FaUser } from "react-icons/fa";
import useRole from "../hooks/userRole";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { role, isLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-20 ">
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
          p-6 pt-20
          transform
          transition-transform duration-300 ease-in-out
          z-30

          md:sticky md:top-0 md:translate-x-0 md:z-auto md:bg-transparent md:p-4
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
        `}
      >
        <ul className="menu space-y-4 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 h-screen">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUser /> <span>Dashboard Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUser /> <span>Profile</span>
            </NavLink>
          </li>

          {role === "donor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
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
                      isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaList /> <span>My Donation Requests</span>
                </NavLink>
              </li>
            </>
          )}

          {role === "volunteer" && (
           <>
            <li>
              <NavLink
                to="/dashboard/all-blood-request"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md ${
                    isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
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
                    isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaList /> <span>Content Managements</span>
              </NavLink>
            </li>
           </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
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
                      isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
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
                      isActive ? "bg-primaryColor text-white font-semibold" : "text-gray-700 hover:bg-primaryColor hover:text-white"
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

      {/* Content */}
      <main
        className="flex-1 p-6  overflow-auto min-h-screen"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)} // close sidebar on content click (mobile)
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
