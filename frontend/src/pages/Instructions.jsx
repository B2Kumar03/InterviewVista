import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const startInterview = () => {
    navigate(`/interview/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Interview Instructions
        </h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Welcome to your interview. Please read the instructions below carefully before you begin.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Technical Round:</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You will be presented with a series of technical questions.</li>
              <li>For coding questions, a code editor will be provided.</li>
              <li>You can switch between questions, but you must submit your answers before the timer runs out.</li>
              <li>You will be required to share your screen during the interview.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">HR Round:</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>This round will assess your soft skills and cultural fit.</li>
              <li>Be prepared to answer behavioral questions.</li>
              <li>Your camera and microphone must be enabled for this round.</li>
            </ul>
          </div>
          <p className="text-center font-semibold text-lg mt-6">
            Good Luck!
          </p>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={startInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;