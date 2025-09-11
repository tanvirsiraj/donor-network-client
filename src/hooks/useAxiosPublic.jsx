import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://donor-network-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
