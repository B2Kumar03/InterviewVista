import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (email && password.length >= 6 && name) {
      fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Registered successfully!");
            navigate("/login");
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Please fill all fields and make sure password is 6+ characters");
    }
  };

  const handleGoogleRegister = () => {
    // Simulate Google sign-up
    toast.success("Registered with Google!");
    // In real app: implement Firebase / Google Auth SDK
  };

  return (
    <form onSubmit={handleRegister} className="bg-[#0B1120] p-6 rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-white text-2xl font-semibold mb-4 text-center">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
        Register
      </button>

      <div className="my-4 text-center text-white">or</div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        className="flex items-center justify-center gap-3 bg-white text-black px-4 py-2 rounded w-full hover:bg-gray-200 transition"
      >
        <FcGoogle size={22} /> Register with Google
      </button>

      <p className="text-sm text-center text-gray-300 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    </form>
  );
};

export default Register;
