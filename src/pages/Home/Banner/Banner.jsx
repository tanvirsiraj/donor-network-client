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
        <div className="max-w-4xl ">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            Be the Link, Save a Life.
          </h1>
          <p className="text-sm md:text-lg md:leading-6 mb-5   md:mb-10">
            Donor Network is a free platform connecting blood donors with those
            in need across Bangladesh. It provides real-time, seamless access to
            voluntary donors, ensuring life-saving support is just a click away.
            Join us in building a stronger, healthier community by bridging the
            gap between donors and recipients effortlessly.
          </p>
          <div className="flex justify-center items-center gap-2 md:gap-6 ">
            <Link
              className="bg-primaryColor text-white hover:bg-red-500 hover:text-white text-sm md:text-lg font-semibold w-fit px-2 py-2 md:px-4 md:py-2 rounded-lg transition duration-300 shadow-xl"
              to="/register"
            >
              Join as a Donor
            </Link>
            <Link
              className="bg-primaryColor text-white hover:bg-red-500 hover:text-white text-sm md:text-lg font-semibold w-fit px-2 py-2 md:px-4 md:py-2 rounded-lg transition duration-300 shadow-xl"
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
