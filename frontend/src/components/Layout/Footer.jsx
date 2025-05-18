import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Name */}
        <div className="text-xl font-bold mb-4 md:mb-0">
          <span className="text-green-400">AI</span>
          <span className="text-blue-400">-Interviewer</span>
        </div>

        {/* Useful Links */}
        <div className="flex gap-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/interview" className="hover:text-green-400">Interview</Link>
          <Link to="/about" className="hover:text-green-400">About</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:youremail@example.com" className="hover:text-gray-400">
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-400 text-sm mt-4">
        Made with ❤️ by Bittu .
      </div>
    </footer>
  );
};

export default Footer;
