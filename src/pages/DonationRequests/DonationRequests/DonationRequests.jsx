import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const DonationRequests = () => {
  // const [donationRequests, setDonationRequests] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    isLoading,
    refetch,
    data: donationRequests,
  } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-requests?status=pending");
      // console.log(res);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-primaryColor"></span>
    );
  }

  /*   // Fetch pending donation requests
  useEffect(() => {
    axiosPublic
      .get("/donation-requests?status=pending") // Backend API to get pending requests
      .then((res) => setDonationRequests(res.data))
      .catch((err) => console.error(err));
  }, []); */

  return (
    <div className="max-w-7xl mx-auto mt-40">
      <div className="py-10 bg-gray-50">
        {/*    <h1 className="text-3xl text-center font-bold text-primaryColor mb-8">
          Blood Donation Requests
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donationRequests.map((request) => (
            <div key={request._id} className="card bg-white shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primaryColor">
                  Recipient: {request.recipientName}
                </h2>
                <p>
                  Location: {request.recipientDistrict},{" "}
                  {request.recipientUpazila}
                </p>
                <p>
                  Blood Group: <strong>{request.bloodGroup}</strong>
                </p>
                <p>Date: {request.donationDate}</p>
                <p>Time: {request.donationTime}</p>
                <div className="card-actions justify-end">
                  <Link to={`/donation-requests/${request._id}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
