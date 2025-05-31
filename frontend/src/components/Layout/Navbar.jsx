import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut, FiUser, FiHome } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuth";
import axios from "axios";

export default function Navbar() {
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/get-interview",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Interviews:", response.data);
      setInterviews(response.data.interviews || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleAuth = () => logout();

  const handleInterviewsClick = () => {
    if (isLoggedIn) {
      fetchInterviews();
      setShowInterviewModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex sticky top-0 z-50 items-center justify-between px-6 py-4 bg-[#0B1120] text-white shadow-md">
        <Link to="/" className="text-xl font-bold">
          <span className="text-green-400">AI</span>
          <span className="text-blue-400">-Interviewer</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-green-300 flex items-center gap-1">
            <FiHome /> Home
          </Link>

          <button
            onClick={handleInterviewsClick}
            className="hover:text-green-300 flex items-center gap-1"
          >
            🎙️ Interviews
          </button>

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
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
            >
              <FiLogIn /> Login
            </button>
          )}
        </div>
      </nav>

      {/* Interview Sidebar */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-[#0B1120] text-white w-1/3 max-w-full p-5 shadow-xl overflow-y-auto relative animate-slide-in-left rounded-r-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-600">
              <h2 className="text-xl font-bold">📋 Your Interviews</h2>
              <button
                onClick={() => setShowInterviewModal(false)}
                className="text-xl font-bold text-gray-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            {interviews.length === 0 ? (
              <p className="text-gray-400">No interviews found.</p>
            ) : null}


            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-[#1F2937] hover:bg-[#374151] rounded-lg mb-4 p-4 shadow border border-gray-700 transition"
              >
                <img
                  src="https://www.aihr.com/wp-content/uploads/Interview-guide-768x401.jpg"
                  alt="Interview"
                  className="rounded-md h-32 w-full object-cover mb-3"
                />
                <h3 className="text-md font-semibold">
                  {interview.jobProfile}
                </h3>

                {interview.status ? (
                  <>
                    <p className="text-sm text-green-400">✅ Attempted</p>
                    <p className="text-sm mt-1">
                      Score:{" "}
                      <span className="font-bold">{interview.score}</span>
                    </p>
                    <p className="text-sm italic mt-1 text-gray-300">
                      “{interview.feedback}”
                    </p>
                    <button
                      className="mt-3 w-full px-3 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        setShowInterviewModal(false);
                        navigate("/interview/details/" + interview._id);
                      }}
                    >
                      View Details
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-yellow-400">❌ Not Attempted</p>
                    <button
                      className="mt-3 w-full px-3 py-2 text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => {
                        setShowInterviewModal(false);
                        navigate("/interviews/instruction/" + interview._id);
                      }}
                    >
                      Take Interview
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div
            className="flex-1"
            onClick={() => setShowInterviewModal(false)}
          />
        </div>
      )}

      {/* Right Modal for Starting New Interview */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end">
          <div className="bg-[#0B1120] text-white w-1/3 max-w-full p-5 shadow-xl overflow-y-auto animate-slide-in-right rounded-l-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-600">
              <h2 className="text-xl font-bold">🚀 Ready to Begin?</h2>
              <button
                onClick={() => setSelectedInterview(null)}
                className="text-xl font-bold text-gray-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {selectedInterview.title}
              </h3>
              <p className="text-sm text-gray-300">
                You haven't attempted this interview yet. Click below to begin
                the session.
              </p>

              <button
                onClick={() => {
                  navigate(`/interview/${selectedInterview.id}`);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Start Interview
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setSelectedInterview(null)} />
        </div>
      )}
    </>
  );
}
