import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isLoading,
    refetch,
    data: userData,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  return [isLoading, userData, refetch];
};

export default useUsers;
