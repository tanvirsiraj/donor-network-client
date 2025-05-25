import { useForm } from "react-hook-form";
import useGetDistrictUpazila from "../../../../hooks/useGetDistrictUpazila";
import useUsers from "../../../../hooks/useUsers";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [districts, upazilas] = useGetDistrictUpazila();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isLoading, userData, refetch] = useUsers();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();



  // Filter upazilas based on the selected district
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        (upazila) => upazila.district_id === selectedDistrict
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);
    if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-primaryColor"></span>
    );
  }

  const onSubmit = async (data) => {
    if (userData.status !== "active") {
      Swal.fire({
        icon: "error",
        title: "Blocked",
        text: "You are not allowed to create a donation request.",
      });
      return;
    }

    const districtName = districts.find((d) => d.id === data.district)?.name;
    const upazilaName = upazilas.find((u) => u.id === data.upazila)?.name;

    const donationRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName,
      recipientUpazila: upazilaName,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
    };
    // console.log(donationRequest);

    try {
      const response = await axiosSecure.post(
        "/donation-requests",
        donationRequest
      );
      if (response?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created",
          text: "Your donation request has been successfully created.",
        });
        reset();
        setSelectedDistrict("");
setFilteredUpazilas([]);
      }
    } catch (error) {
      console.error("Error creating donation request:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="flex  items-center pb-20    ml-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl text-center text-primaryColor font-bold mb-6">
          Create Donation Request
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Requester Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Requester Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recipient Name
            </label>
            <input
              type="text"
              {...register("recipientName", {
                required: "Recipient name is required",
              })}
              placeholder="Recipient Name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipientName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recipient District
            </label>
            <select
              {...register("district", { required: "District is required" })}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-xs mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recipient Upazila
            </label>
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500 text-xs mt-1">
                {errors.upazila.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              {...register("hospitalName", {
                required: "Hospital name is required",
              })}
              placeholder="Hospital Name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
            {errors.hospitalName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hospitalName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <input
              type="text"
              {...register("fullAddress", {
                required: "Full address is required",
              })}
              placeholder="Full Address"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
            {errors.fullAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullAddress.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Donation Date
            </label>
            <input
              type="date"
              {...register("donationDate", {
                required: "Donation date is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
            {errors.donationDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.donationDate.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Donation Time
            </label>
            <input
              type="time"
              {...register("donationTime", {
                required: "Donation time is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
            {errors.donationTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.donationTime.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Request Message
            </label>
            <textarea
              {...register("requestMessage", {
                required: "Request message is required",
              })}
              placeholder="Write your message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            ></textarea>
            {errors.requestMessage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.requestMessage.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primaryColor text-white rounded-lg hover:bg-[#e03a38] transition duration-300"
          >
            Create Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
