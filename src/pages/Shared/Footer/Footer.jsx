import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../../../public/logo.png";

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="max-w-6xl mx-auto  px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="Logo" className="h-14" />
          </Link>
          <p className="text-sm text-gray-400">
            A community-driven blood donation platform to help those in need.
            Connect, donate, and save lives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/donation-requests"
                className="hover:text-white transition"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © {getCurrentYear} Blood Donation Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
