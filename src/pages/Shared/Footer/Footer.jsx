import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-base-200">
      {/* Footer */}
      <footer className="bg-white text-black py-6">
        <div className="max-w-4xl mx-auto flex justify-between">
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/donation-requests">Donation Requests</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Follow Us</h3>
            <ul>
              <li>
                <a href="#facebook">Facebook</a>
              </li>
              <li>
                <a href="#twitter">Twitter</a>
              </li>
              <li>
                <a href="#instagram">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6">
          © 2025 Blood Donation Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
