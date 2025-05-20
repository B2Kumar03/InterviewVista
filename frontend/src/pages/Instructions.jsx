import React from 'react';

const Instructions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white px-4">
      <div className="bg-[#172240] border border-gray-800 rounded-lg p-8 max-w-2xl w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Important Interview Instructions
        </h2>

        <div className="bg-red-900 text-red-300 border border-red-700 rounded p-4 mb-6 flex items-start gap-2">
          <span>⚠️</span>
          <p>
            You must maintain fullscreen mode throughout the interview. Exiting
            fullscreen mode multiple times will terminate the interview session.
          </p>
        </div>

        <ul className="space-y-3 text-sm leading-relaxed text-gray-300">
          <li>• A stable internet connection to prevent interruptions</li>
          <li>• A quiet environment for clear audio recording</li>
          <li>• Your camera and microphone properly set up</li>
          <li>• Enough time to complete the interview without interruption</li>
          <li>
            • Once you proceed to the next question, you will{' '}
            <span className="text-red-400 font-medium">not be able to return to the previous one</span>.
            Ensure you review and save your response before moving forward.
          </li>
        </ul>

        <p className="text-yellow-400 mt-4 text-sm">
          <strong>Note:</strong> If you refresh the page, the interview will restart from the beginning.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow">
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
