import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get("/upazilas.json")
      .then((res) => setUpazilas(res.data))
      .catch((error) => console.log(error));
  }, []);
  //   console.log(districts);

  // Filter upazilas based on selected district
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

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imagebb and then get an url
    const imageFile = { image: data.avatar[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);

    const districtName = districts[parseInt(data.district) - 1].name;
    const upazilaName = upazilas[parseInt(data.upazila) - 1].name;
    console.log(districtName, upazilaName);

    if (res.data.success) {
      const userInfo = {
        email: data.email,
        name: data.name,
        image: res.data.data.display_url,
        bloodGroup: data.bloodGroup,
        districtName,
        upazilaName,
      };

      createUser(data.email, data.password).then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, res.data.data.display_url).then(() => {
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // reset();
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              }),
                navigate("/");
            }
          });
        });
      });

      console.log(userInfo);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-primaryColor bg-opacity-20 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl text-center text-primaryColor font-bold mb-6">
          Please Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* avatar  */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              name=""
              id="avatar"
              {...register("avatar", { required: "Image is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>
          {/* Blood Group Selector */}
          <div className="mb-4">
            <label
              htmlFor="bloodGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Select Blood Group
            </label>
            <select
              id="bloodGroup"
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="w-full p-3 border border-gray-300  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Type your password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* district select  */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              Select District
            </label>
            <select
              name=""
              id="district"
              {...register("district", { required: "District is required" })}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
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

          {/* Upazila Select */}
          <div className="mb-4">
            <label
              htmlFor="upazila"
              className="block text-sm font-medium text-gray-700"
            >
              Select Upazila
            </label>
            <select
              id="upazila"
              {...register("upazila", { required: "Upazila is required" })}
              className="w-full p-3 border  border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#fe3c47] focus:border-[#fe3c47]"
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

          <button
            type="submit"
            className="w-full py-3 bg-primaryColor text-white rounded-lg hover:bg-[#e03a38] transition duration-300"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="text-primaryColor hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
