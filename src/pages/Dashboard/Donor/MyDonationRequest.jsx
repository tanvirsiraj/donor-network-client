"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donationRequests, setDonationRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-donation-requests?email=${user.email}`)
        .then((res) => {
          setDonationRequests(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const filteredRequests =
    filter === "all"
      ? donationRequests
      : donationRequests.filter((r) => r.status === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

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

      {/* Responsive Table */}
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
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
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
                  <td className="px-4 py-2 font-semibold text-red-600">{req.bloodGroup}</td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequest;
