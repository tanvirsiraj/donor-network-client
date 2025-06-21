import React from "react";
import { FaHandsHelping, FaSearchLocation, FaShieldAlt } from "react-icons/fa";

const FeaturedSection = () => {
  const features = [
    {
      title: "Easy Donor Search",
      description:
        "Find donors near you quickly with our intuitive search tools.",
      icon: <FaSearchLocation color="#fe3c47" />,
      color: "bg-red-50 border-red-500",
    },
    {
      title: "Secure Donations",
      description:
        "Ensure your contributions are safe and reach the right people.",
      icon: <FaShieldAlt color="#34d399" />,
      color: "bg-green-50 border-green-500",
    },
    {
      title: "Community Building",
      description:
        "Join a network of donors and recipients to create a stronger community.",
      icon: <FaHandsHelping color="#60a5fa" />,
      color: "bg-blue-50 border-blue-500",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#fe3c47] mb-8 animate-fadeIn">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto animate-fadeIn delay-200">
          Our platform is dedicated to connecting donors with those in need,
          ensuring every donation makes a meaningful impact.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg border-l-4 ${feature.color} hover:shadow-xl transform hover:-translate-y-2 transition duration-300 flex flex-col items-center`}
            >
              <div className="text-5xl mb-4  animate-bounce delay-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
