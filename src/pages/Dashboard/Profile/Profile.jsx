import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import useGetDistrictUpazila from "../../../hooks/useGetDistrictUpazila";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
  const [isLoading, userData, refetch] = useUsers();
  const [isEditable, setIsEditable] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [districts, upazilas] = useGetDistrictUpazila();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEdit = () => setIsEditable(!isEditable);
  console.log(selectedDistrict);
  const handleSave = async (data) => {
    console.log("Saved data:", data);

    const districtName = districts[parseInt(data.district) - 1].name;
    const upazilaName = upazilas[parseInt(data.upazila) - 1].name;

    const userInfo = {
      name: data.name,
      image: data.avatar,
      bloodGroup: data.bloodGroup,
      districtName,
      upazilaName,
    };

    console.log(userInfo);

    const res = await axiosSecure.patch(`/users?email=${user.email}`, userInfo);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "user information updated",
        showConfirmButton: false,
        timer: 1500,
      });

      // reset();
      setIsEditable(!isEditable);
      refetch();
    }
  };
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

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg  max-w-3xl  ">
      {/* Profile Picture and Name */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#fe3c47]">
          <img
            src={userData.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4 text-[#fe3c47]">
          {userData.name}
        </h2>
        <div className="flex justify-center">
          <p>{userData.upazilaName},</p>
          <p>{userData.districtName}, Bangladesh</p>
        </div>
        {isEditable && (
          <button
            onClick={handleEdit}
            className="btn border-none btn-primary mt-2 px-6 py-2 text-white bg-[#fe3c47] rounded-lg"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleSave)}
        className="grid grid-cols-1 gap-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={userData.name}
            disabled={isEditable}
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe3c47]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block  font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="avatar" className="block  font-medium">
            Profile Picture
          </label>
          <input
            type="text"
            id="avatar"
            defaultValue={userData.image}
            disabled={isEditable}
            {...register("avatar", { required: "Image is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe3c47]"
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label htmlFor="district" className="block  font-medium">
            Select District
          </label>
          <select
            id="district"
            disabled={isEditable}
            value={selectedDistrict}
            {...register("district", { required: "District is required" })}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe3c47]"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* Upazila */}
        <div>
          <label htmlFor="upazila" className="block  font-medium">
            Select Upazila
          </label>
          <select
            id="upazila"
            disabled={!selectedDistrict || isEditable}
            {...register("upazila", { required: "Upazila is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe3c47]"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name}
              </option>
            ))}
          </select>
          {errors.upazila && (
            <p className="text-red-500 text-sm mt-1">
              {errors.upazila.message}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className="block font-medium">
            Select Blood Group
          </label>
          <select
            id="bloodGroup"
            disabled={isEditable}
            defaultValue={userData.bloodGroup}
            {...register("bloodGroup", {
              required: "Blood group is required",
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe3c47]"
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
            <p className="text-red-500 text-sm mt-1">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {!isEditable && (
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#fe3c47] rounded-lg hover:bg-[#e5333d] transition"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
