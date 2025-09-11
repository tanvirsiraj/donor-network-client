import React, { useEffect, useState } from "react";
import { FaUsers, FaDonate, FaHandHoldingUsd } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Fetch total users
        const userRes = await axiosSecure.get("/all-users");
        setTotalUsers(userRes.data.length);

        // Fetch all donations
        const donationRes = await axiosSecure.get("/donations");
        const donations = donationRes.data;

        // Calculate total funding
        const total = donations.reduce(
          (acc, cur) => acc + (parseFloat(cur.amount) || 0),
          0
        );
        setTotalFunding(total);

        // Sort and get the 5 most recent donations
        const sorted = donations
          .filter((d) => d.date)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentDonations(sorted);

        // Fetch total donation requests
        const requestRes = await axiosSecure.get("/donation-requests");
        setTotalRequests(requestRes.data.length);

        // Set document title and stop loading
        document.title = "Admin Dashboard - Charity App";
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {/* Top Summary Cards */}
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <div className="text-blue-600 text-4xl">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-gray-700 text-lg">{totalUsers}</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <div className="text-green-600 text-4xl">
            <FaHandHoldingUsd />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Total Funding</h3>
            <p className="text-gray-700 text-lg">${totalFunding.toFixed(2)}</p>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
          <div className="text-red-600 text-4xl">
            <FaDonate />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Donation Requests</h3>
            <p className="text-gray-700 text-lg">{totalRequests}</p>
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">Recent Donations</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Donor Name</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentDonations.length > 0 ? (
              recentDonations.map((donation, index) => (
                <tr key={index} className="hover:bg-gray-50 text-left">
                  <td className="px-4 py-2 border-b">
                    {donation.donorName || "Anonymous"}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    ${parseFloat(donation.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-4 py-2">
                  No recent donations
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
