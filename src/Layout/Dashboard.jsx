import { FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const role = "donor";
  return (
    <div className="flex ">
      {/* dashboard side bar  */}
      <div className="w-64 min-h-screen bg-primaryColor bg-opacity-20">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/profile">
              <FaUser />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content  */}
      <div className="flex-1 ml-4 mt-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
