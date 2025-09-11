import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllBloodRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donationRequests, setDonationRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [role, setRole] = useState("");

  // Fetch logged-in user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users?email=${user.email}`)
        .then((res) => setRole(res?.data?.role))
        .catch((err) => console.error("Error fetching user role:", err));
    }
  }, [user, axiosSecure]);

  // Fetch all donation requests
  useEffect(() => {
    axiosSecure
      .get(`/donation-requests`)
      .then((res) => setDonationRequests(res.data))
      .catch((err) => console.error("Error fetching donation requests:", err));
  }, [axiosSecure]);

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donation-requests/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The request has been removed.", "success");
              setDonationRequests((prev) =>
                prev.filter((item) => item._id !== id)
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete the request.", "error");
            console.error(err);
          });
      }
    });
  };

  // Handle status update by volunteer
  const handleStatusUpdate = (id, newStatus) => {
    Swal.fire({
      title: "Confirm Status Update",
      text: `Are you sure you want to change the status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/donation-request-update/${id}`, { status: newStatus })
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Updated!", "Status has been updated.", "success");
              setDonationRequests((prev) =>
                prev.map((item) =>
                  item._id === id ? { ...item, status: newStatus } : item
                )
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to update status.", "error");
            console.error(err);
          });
      }
    });
  };

  // Filtered data based on status
  const filteredRequests =
    filter === "all"
      ? donationRequests
      : donationRequests.filter((r) => r.status === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Donation Requests</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "inprogress", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded text-sm font-medium border ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <tr>
              <th className="px-4 py-2">Recipient</th>
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">District</th>
              <th className="px-4 py-2">Upazila</th>
              <th className="px-4 py-2">Hospital</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{req.recipientName}</td>
                  <td className="px-4 py-2 font-semibold text-red-600">
                    {req.bloodGroup}
                  </td>
                  <td className="px-4 py-2">{req.recipientDistrict}</td>
                  <td className="px-4 py-2">{req.recipientUpazila}</td>
                  <td className="px-4 py-2">{req.hospitalName}</td>
                  <td className="px-4 py-2">{req.donationDate}</td>
                  <td className="px-4 py-2">{req.donationTime}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        req.status === "inprogress"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : req.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {role === "volunteer" ? (
                      <select
                        value={req.status}
                        onChange={(e) =>
                          handleStatusUpdate(req._id, e.target.value)
                        }
                        className="border p-1 rounded text-sm"
                      >
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodRequest;
