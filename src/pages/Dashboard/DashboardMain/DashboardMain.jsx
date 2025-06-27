import React, { useContext } from "react";
import useRole from "../../../hooks/userRole";
import { AuthContext } from "../../../providers/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";


const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  console.log("User", user);

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, <span className="text-blue-800">{user?.displayName} as <span className="text-orange-400 ">{role}</span> </span></h1>

      {role === "admin" && (
        <AdminDashboard/>
      )}

      {role === "volunteer" && (
       <AdminDashboard/>
      )}

      {role === "donor" && (
       <DonorDashboard/>
      )}
    </div>
  );
};

export default DashboardMain;
