import { Link } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiUser, FiHome } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  // 🔒 Mock auth state (replace with real auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        <span className="text-green-400">AI</span>
        <span className="text-blue-400">-Interviewer</span>
      </Link>

      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-300 flex items-center gap-1">
          <FiHome /> Home
        </Link>

        <Link to="/interview" className="hover:text-green-300 flex items-center gap-1">
          🎙️ Interview
        </Link>

        {/* Conditional Auth Buttons */}
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full">
              <FiUser />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleAuth}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleAuth}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
          >
            <FiLogIn /> Login
          </button>
        )}
      </div>
    </nav>
  );
}
