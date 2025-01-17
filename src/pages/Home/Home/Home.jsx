import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import FeaturedSection from "../FeaturedSection/FeaturedSection";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
