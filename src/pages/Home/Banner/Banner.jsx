import { Link } from "react-router-dom";
import banner1 from "../../../assets/banner1.avif";
import banner2 from "../../../assets/banner2.jpg";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen bg-fixed"
      style={{
        backgroundImage: `url(${banner2})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl ">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            Be the Link, Save a Life.
          </h1>
          <p className="text-lg leading-6 mb-10">
            A free platform connecting blood donors with those in need across
            Bangladesh, enabling seamless, real-time, life-saving connections
            for everyone.
          </p>
          <div className="flex justify-center items-center gap-6 ">
            <Link
              className="bg-primaryColor text-white hover:bg-red-500 hover:text-white text-lg font-semibold w-fit px-4 py-2 rounded-lg transition duration-300 shadow-xl"
              to="/register"
            >
              Join as a Donor
            </Link>
            <Link
              className="bg-primaryColor text-white hover:bg-red-500 hover:text-white text-lg font-semibold w-fit px-4 py-2 rounded-lg transition duration-300 shadow-xl"
              to="/search"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
