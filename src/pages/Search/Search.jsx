import { useEffect, useState } from "react";
import useGetDistrictUpazila from "../../hooks/useGetDistrictUpazila";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const Search = () => {
  const [districts, upazilas] = useGetDistrictUpazila();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState(""); // Store the district name
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedUpazilaName, setSelectedUpazilaName] = useState(""); // Store the upazila name
  const [searchData, setSearchData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // to track if search has been made
  const axiosSecure = useAxiosSecure();

  // Filter upazilas when district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        (u) => String(u.district_id) === String(selectedDistrict)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" && { upazila: "" }),
    }));

    if (name === "district") {
      setSelectedDistrict(value);
      const districtName = districts.find(
        (district) => district.id === value
      )?.name;
      setSelectedDistrictName(districtName); // Store district name
    }

    if (name === "upazila") {
      setSelectedUpazilaName(upazilas.find((u) => u.id === value)?.name); // Store upazila name
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const res = await axiosSecure.get("/donors/search", {
        params: {
          bloodGroup: searchData.bloodGroup,
          district: selectedDistrictName, // Send the district name
          upazila: selectedUpazilaName, // Send the upazila name
        },
      });

      setDonors(res.data || []);
      console.log("Fetched donors:", res.data);
    } catch (err) {
      console.error("Error fetching donors", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen px-4 pt-28 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-primaryColor mb-6">
          Search Blood Donors
        </h2>
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm md:text-base font-semibold  mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md "
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-base font-semibold mb-1">
              District
            </label>
            <select
              name="district"
              onChange={handleChange}
              value={searchData.district}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-base font-semibold mb-1">
              Upazila
            </label>
            <select
              name="upazila"
              onChange={handleChange}
              value={searchData.upazila}
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={!selectedDistrict}
              required
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-primaryColor text-white font-semibold rounded-md hover:bg-[#e03a38] transition duration-300"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto mt-10">
        {searched && !loading && donors.length === 0 && (
          <p className="text-center text-red-600 md:text-xl font-medium">
            No donors found for the selected criteria.
          </p>
        )}

        {donors.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center text-primaryColor">
              Found {donors.length} Donor{donors.length > 1 ? "s" : ""}
            </h3>
            <div className="grid gap-4  md:grid-cols-2">
              {donors.map(
                (donor) => (
                  console.log("Rendering donor:", donor),
                  (
                    <div
                      key={donor._id}
                      className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center"
                    >
                      <div className="avatar flex justify-center mb-2">
                        <div className="w-20 rounded-full border-2 border-primaryColor">
                          <img src={donor.image} />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm md:text-base font-bold">
                          {donor.name}
                        </h4>
                      </div>
                      <div>
                        <p className="text-sm md:text-base ">
                          <strong>Blood Group:</strong> {donor.bloodGroup}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-base">
                          <strong>Contact:</strong> {donor?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
