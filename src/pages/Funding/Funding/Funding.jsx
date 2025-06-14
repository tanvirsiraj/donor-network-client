import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);
  

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axiosSecure.get("/donations");
        setDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch donations", err);
      }
    };

    fetchDonations();
  }, [axiosSecure]);

  return (
    <div className="my-24 px-4 max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <Link to="donate-now">
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            Give Fund
          </button>
        </Link>
      </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">All Donors</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Donor Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Amount (USD)</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{donation.donorName}</td>
                <td className="px-4 py-2 border">{donation.email}</td>
                <td className="px-4 py-2 border">${donation.amount}</td>
                <td className="px-4 py-2 border">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-sm">{donation.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
