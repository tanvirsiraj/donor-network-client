import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://donor-network-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
