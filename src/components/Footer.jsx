import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-black text-white py-12 border-t">
      <div className="container mx-auto text-center px-6 md:px-12">
        {/* Website Name and Copyright */}
        <p className="text-lg font-semibold text-gray-200 mb-4">
          © {new Date().getFullYear()} MoviePortal. All rights reserved.
        </p>

        {/* Contact Information */}
        <div className="text-gray-300 mb-6">
          <p className="text-sm">Have questions? Contact us at:</p>
          <a
            href="mailto:contact@movieportal.com"
            className="text-indigo-200 hover:text-indigo-400 transition duration-300"
          >
            contact@movieportal.com
          </a>
        </div>

        {/* Links (Privacy Policy, Terms of Service, etc.) */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6">
          <a
            href="#"
            className="text-indigo-200 hover:text-indigo-400 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-indigo-200 hover:text-indigo-400 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-indigo-200 hover:text-indigo-400 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            Contact
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center mt-6 space-x-6">
          <a
            href="https://facebook.com"
            className="text-indigo-200 hover:text-indigo-400 text-2xl transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            className="text-indigo-200 hover:text-indigo-400 text-2xl transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="text-indigo-200 hover:text-indigo-400 text-2xl transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
