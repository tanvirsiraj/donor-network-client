import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    axiosSecure
      .get("/all-users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [axiosSecure]);

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/users/${id}/status`, { status });
    refetchUsers();
  };

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/${id}/role`, { role });
    refetchUsers();
  };

  const refetchUsers = async () => {
    const res = await axiosSecure.get("/all-users");
    setUsers(res.data);
  };
  const shouldRenderUp = (index) => {
    const remaining = users.length - index;
    return remaining <= 2; // If only 2 or fewer users below
  };

  return (
    <div className="md:p-4 pt-12 md:pt-4">
      <div className="flex justify-between items-center md:mb-4">
        <h3 className="text-xl font-semibold md:text-2xl md:font-bold mb-4">
          All Users
        </h3>
        {/* filter by status */}
        <div className="mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select md:border-2 select-bordered w-full max-w-xs h-1/2 md:text-base md:font-bold"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 ">
            <tr className="text-black text-base md:text-lg font-semibold">
              <th>Image</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) => filterStatus === "all" || user.status === filterStatus
              )
              .map((user, index) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-12 h-12 md:w-12 md:h-12 rounded-full "
                    />
                  </td>
                  <td className="md:text-base md:font-medium">{user.email}</td>
                  <td className="md:text-base md:font-medium">{user.name}</td>
                  <td className="md:text-base md:font-medium">{user.role}</td>
                  <td className="md:text-base md:font-medium">{user.status}</td>
                  <td className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === user._id ? null : user._id
                        )
                      }
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openDropdownId === user._id && (
                      <div
                        className={`absolute z-10 bg-white border rounded-md shadow-md p-2 right-0 w-40 space-y-1
  ${shouldRenderUp(index) ? "bottom-full mb-1" : "top-full mt-1"}
`}
                      >
                        {user.status === "active" ? (
                          <button
                            className="w-full text-left text-red-600 hover:bg-gray-100 px-2 py-1 md:font-medium"
                            onClick={() =>
                              handleStatusChange(user._id, "blocked")
                            }
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            className="w-full text-left text-green-600 hover:bg-gray-100 px-2 py-1 md:font-medium"
                            onClick={() =>
                              handleStatusChange(user._id, "active")
                            }
                          >
                            Unblock
                          </button>
                        )}
                        {user.role !== "volunteer" && (
                          <button
                            className="w-full text-left hover:bg-gray-100 px-2 py-1 md:font-medium"
                            onClick={() =>
                              handleRoleChange(user._id, "volunteer")
                            }
                          >
                            Make Volunteer
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button
                            className="w-full text-left hover:bg-gray-100 px-2 py-1 md:font-medium"
                            onClick={() => handleRoleChange(user._id, "admin")}
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role !== "donor" && (
                          <button
                            className="w-full text-left hover:bg-gray-100 px-2 py-1"
                            onClick={() => handleRoleChange(user._id, "donor")}
                          >
                            Make Donor
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
