import axios from "axios";
import { useEffect, useState } from "react";

const useGetDistrictUpazila = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
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

  return [districts, upazilas];
};

export default useGetDistrictUpazila;
