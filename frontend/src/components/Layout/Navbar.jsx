import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiUser, FiHome } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/UserAuth';

export default function Navbar() {

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const navigate = useNavigate();
   const {user,isLoggedIn,logout}=useContext(AuthContext);
  
  const mockInterviews = [
    { id: 1, title: "Frontend Developer - Google", attempted: true },
    { id: 2, title: "Backend Developer - Amazon", attempted: false },
    { id: 3, title: "Full Stack Engineer - Meta", attempted: true },
    { id: 4, title: "DevOps Engineer - Netflix", attempted: false },
    { id: 5, title: "AI Specialist - OpenAI", attempted: true }
  ];

  const handleAuth = () => {
   logout()
  };

  const handleInterviewsClick = () => {
    if (isLoggedIn) {
      setShowInterviewModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="flex sticky top-0 z-50 items-center justify-between px-6 py-4 bg-black text-white shadow-md">
        <Link to="/" className="text-xl font-bold text-white">
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
          <div className="bg-white w-1/3 max-w-full p-5 shadow-xl overflow-y-auto relative animate-slide-in-left rounded-r-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">📋 Your Interviews</h2>
              <button onClick={() => setShowInterviewModal(false)} className="text-xl font-bold text-gray-500 hover:text-red-600">✕</button>
            </div>

            {mockInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg mb-4 p-3 shadow-sm border"
              >
                <img
                  src="https://media.istockphoto.com/id/1298405314/vector/job-interview.jpg"
                  alt="Interview"
                  className="rounded-md h-32 w-full object-cover mb-3"
                />
                <h3 className="text-md font-semibold text-gray-800">{interview.title}</h3>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className={interview.attempted ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                    {interview.attempted ? "Attempted" : "Not Attempted"}
                  </span>
                </p>
                <button
                  className={`mt-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    interview.attempted ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white transition`}
                  onClick={() => !interview.attempted && setSelectedInterview(interview)}
                >
                  {interview.attempted ? "See Details" : "Try Again"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex-1" onClick={() => setShowInterviewModal(false)} />
        </div>
      )}

      {/* Right Modal for Try Again */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end">
          <div className="bg-[white] w-1/3 max-w-full p-5 shadow-xl overflow-y-auto animate-slide-in-right rounded-l-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">🚀 Ready to Retry?</h2>
              <button onClick={() => setSelectedInterview(null)} className="text-xl font-bold text-gray-500 hover:text-red-600">✕</button>
            </div>

            <div className="text-gray-700 space-y-4">
              <h3 className="text-lg font-semibold">{selectedInterview.title}</h3>
              <p className="text-sm">You haven't attempted this interview yet. Click below to begin the session.</p>

              <button
                onClick={() => alert("Starting interview...")}
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
