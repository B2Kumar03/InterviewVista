import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const mockUser = {
      email: "test@example.com",
      password: "123456",
    };

    if (email === mockUser.email && password === mockUser.password) {
      toast.success("Login successful!");
      // Perform login logic here
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    toast.success("Logged in with Google!");
    // Add real Google OAuth here in future
  };

  return (
    <form onSubmit={handleLogin} className="bg-[#0B1120] p-6 rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-white text-2xl font-semibold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
        Login
      </button>

      <div className="my-4 text-center text-white">or</div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 bg-white text-black px-4 py-2 rounded w-full hover:bg-gray-200 transition"
      >
        <FcGoogle size={22} /> Login with Google
      </button>

      <p className="text-sm text-center text-gray-300 mt-4">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Register here
        </span>
      </p>
    </form>
  );
};

export default Login;
