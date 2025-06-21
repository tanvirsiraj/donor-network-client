import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import MarqueeSlider from "./MarqueeSlider";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <Gallery/>
      <ContactUs></ContactUs>
      <MarqueeSlider/>
    </div>
  );
};

export default Home;
