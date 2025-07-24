import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/UserAuth";
import { getAuth, signInWithPopup, GoogleAuthProvider,getRedirectResult, signOut } from "firebase/auth"; 
import { app } from "./firebaseConfig"; // Firebase config


const Login = () => {
  const navigate = useNavigate();
 const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
       // Save user in context
      toast.success("Login successful!");
      login(data);
      navigate("/"); // Redirect to home
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);  // Set the logged-in user info
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
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
