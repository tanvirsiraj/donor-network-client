import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateModalRequest from "./UpdateModalRequest";
import Action from "./Action";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donationRequests, setDonationRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editModalData, setEditModalData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get(
        `/my-donation-requests?email=${user.email}`
      );
      setDonationRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${id}`);
        fetchRequests();
        Swal.fire("Deleted!", "The request has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  const handleUpdate = (request) => {
    console.log("Update clicked:", request);
    setEditModalData({ ...request });
  };

  const handleSaveUpdate = async () => {
     console.log("Updating with:", editModalData); 
    try {
      const res = await axiosSecure.patch(
        `/donation-request-update/${editModalData._id}`,
        {
          recipientName: editModalData.recipientName,
          bloodGroup: editModalData.bloodGroup,
          recipientDistrict: editModalData.recipientDistrict,
          recipientUpazila: editModalData.recipientUpazila,
          hospitalName: editModalData.hospitalName,
          donationDate: editModalData.donationDate,
          donationTime: editModalData.donationTime,
        }
      );
      console.log(res.data, "updated data");
      setEditModalData(null);
      fetchRequests();
      Swal.fire(
        "Updated!",
        "Donation request updated successfully.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Failed to update the request.", "error");
    }
  };

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
              <th className="px-4 py-2">Action</th>
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
                  <td className="px-4 py-2 flex gap-2">
                    <Action
                      handleDelete={() => handleDelete(req._id)}
                      handleUpdate={() => handleUpdate(req)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalData && (
        <UpdateModalRequest
          editModalData={editModalData}
          setEditModalData={setEditModalData}
          handleSaveUpdate={handleSaveUpdate}
        />
      )}
    </div>
  );
};

export default MyDonationRequest;
