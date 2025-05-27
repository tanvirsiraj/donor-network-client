import React, { useContext } from "react";
import useRole from "../../../hooks/userRole";
import { AuthContext } from "../../../providers/AuthProvider";


const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  console.log("User", user);

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard <span className="text-blue-800">{user?.displayName}! </span></h1>

      {role === "admin" && (
        <p className="text-lg text-blue-600">You are logged in as an Admin.</p>
      )}

      {role === "volunteer" && (
        <p className="text-lg text-green-600">You are logged in as a Volunteer.</p>
      )}

      {role === "donor" && (
        <p className="text-lg text-purple-600">You are logged in as a Donor.</p>
      )}
    </div>
  );
};

export default DashboardMain;
