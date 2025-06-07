

import { useState } from "react";
import { FaBars, FaList, FaPlus, FaTimes, FaUsers, FaUser } from "react-icons/fa";
import useRole from "../hooks/userRole";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { role, isLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-primaryColor bg-opacity-20 absolute md:relative z-10`}
      >
        <ul className="menu p-4">
          <li>
    <NavLink to="/dashboard" end>
      <FaUser /> Dashboard Home
    </NavLink>
  </li>
          <li>
            <NavLink to="/dashboard/profile"><FaUser /> Profile</NavLink>
          </li>
          {role === "donor" && (
            <>
              <li>
                <NavLink to="/dashboard/create-donation-request">
                  <FaPlus/> Create Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donation-request">
                  <FaList/> My Donation Requests
                </NavLink>
              </li>
            </>
          )}
          {role === "volunteer" && (
            <>
              <li>
                <NavLink to="/dashboard/volunteer-requests">
                  <FaList /> Assigned Requests
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-users">
                  <FaUsers />All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-requests">
                  <FaList /> All Donation Requests
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

