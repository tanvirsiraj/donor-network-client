import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";


const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDonationRequests = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
        console.log("Fetched donation requests:", res.data);
        const sorted = res.data
          .filter((req) => req.createdAt) // ensure createdAt exists
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2); // show recent 2 requests
        setRequests(sorted);
      } catch (err) {
        console.error("Failed to fetch donation requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonationRequests();
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recent Donation Requests</h3>
        <Link
          to="/dashboard/my-donation-request"
          className="text-primaryColor hover:underline font-medium"
        >
          View All
        </Link>
      </div>

      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Patient Name</th>
                <th className="px-4 py-2 border">Blood Group</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
               <tr key={index} className="hover:bg-gray-50">
  <td className="px-4 py-2 border">{req?.recipientName || "N/A"}</td>
  <td className="px-4 py-2 border">{req.bloodGroup}</td>
  <td className="px-4 py-2 border">
    {req.createdAt || req.date
      ? new Date(req.createdAt || req.date).toLocaleDateString()
      : "Unknown"}
  </td>
  <td className="px-4 py-2 border">
    <span
      className={`px-2 py-1 text-xs rounded ${
        req.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : req.status === "inprogress"
          ? "bg-blue-100 text-blue-700"
          : req.status === "completed"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {req.status}
    </span>
  </td>
</tr>

              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">You haven’t made any donation requests yet.</p>
      )}
    </div>
  );
};

export default DonorDashboard;
