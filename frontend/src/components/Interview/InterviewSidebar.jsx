import React from 'react';

const InterviewSidebar = () => {
  return (
    <aside className="w-64 bg-[#1a1a1a] p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>
      <ul className="space-y-4 text-gray-400">
        <li>Room ID: #12345</li>
        <li>Timer: 05:00</li>
        <li>Status: Connected</li>
      </ul>
    </aside>
  );
};

export default InterviewSidebar;
