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
    <div className="max-w-7xl mx-auto mt-20 mb-20 ">
      <div className="py-10 bg-gray-50">
        {donationRequests?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Donation Requests Currently Available
            </h2>
            <p className="text-gray-500 mt-2">
              Please check back later or explore other sections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationRequests?.map((request) => (
              <div key={request._id} className="card bg-white shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-primaryColor">
                    Recipient: {request.recipientName}
                  </h2>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </p>
                  <p>
                    <span className="font-medium">Blood Group:</span>{" "}
                    <strong>{request.bloodGroup}</strong>
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {request.donationDate}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {request.donationTime}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/donation-requests/${request._id}`}>
                      <button className="btn bg-primaryColor text-white hover:bg-[#e03a38] transition duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
