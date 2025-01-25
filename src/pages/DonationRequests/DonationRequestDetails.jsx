import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { isLoading, data: donationRequestsDetails } = useQuery({
    queryKey: ["donationRequestsDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      // console.log(res);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-primaryColor flex justify-center items-center mt-40 max-w-7xl mx-auto"></span>
    );
  }

  if (!donationRequestsDetails) {
    return <p>No user data found</p>;
  }

  const handleDonation = async () => {
    const res = await axiosSecure.patch(`/donation-requests/${id}`);
    setModalOpen(false);
    // console.log({ status: "inprogress" });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Donation in progress",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  };

  return (
    <div className="mt-40 max-w-7xl mx-auto">
      <div className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>Recipient Name:</strong>{" "}
            {donationRequestsDetails.recipientName}
          </p>
          <p>
            <strong>Email:</strong> {donationRequestsDetails.requesterEmail}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {donationRequestsDetails.recipientDistrict},{" "}
            {donationRequestsDetails.recipientUpazila}
          </p>
          <p>
            <strong>Hospital:</strong> {donationRequestsDetails.hospitalName}
          </p>
          <p>
            <strong>Full Address:</strong> {donationRequestsDetails.fullAddress}
          </p>
          <p>
            <strong>Blood Group:</strong> {donationRequestsDetails.bloodGroup}
          </p>
          <p>
            <strong>Date:</strong> {donationRequestsDetails.donationDate}
          </p>
          <p>
            <strong>Time:</strong> {donationRequestsDetails.donationTime}
          </p>
          <p>
            <strong>Message:</strong> {donationRequestsDetails.requestMessage}
          </p>

          <button
            className="btn btn-primary mt-6"
            onClick={() => setModalOpen(true)}
          >
            Donate
          </button>

          {/* Modal */}
          {modalOpen && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Donation</h3>
                <p>Donor Name: {user.displayName}</p>
                <p>Donor Email: {user.email}</p>
                <div className="modal-action">
                  <button className="btn btn-success" onClick={handleDonation}>
                    Confirm
                  </button>
                  <button className="btn" onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
