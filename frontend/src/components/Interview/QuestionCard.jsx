import React from "react";

const QuestionCard = () => {
  return (
    <div className="bg-[#0B1120] p-4 rounded-lg">
      <h3 className="text-sm text-gray-400 mb-2">
        Current Question 5 of 20 | Category
      </h3>
      <p className="text-white mb-4">
        Explain the concept of polymorphism in C++ and provide an example using
        virtual functions.
      </p>
      <div className="flex gap-2">
        <button className="bg-[#6b2a22] hover:bg-[#e17b6e] text-white px-4 py-2 rounded-md w-fit">
          Save Response
        </button>
        <button className="bg-blue-600 px-3 py-1 rounded text-sm">
          Previous
        </button>
        <button className="bg-green-600 px-3 py-1 rounded text-sm">Next</button>
      </div>
    </div>
  );
};

export default QuestionCard;
