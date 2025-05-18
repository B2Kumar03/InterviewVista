import React, { useState } from 'react';

const RecorderControls = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => setIsRecording(prev => !prev);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={toggleRecording}
        className={`px-4 py-2 rounded ${
          isRecording ? 'bg-red-600' : 'bg-green-600'
        }`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button className="px-4 py-2 bg-blue-600 rounded">Submit</button>
    </div>
  );
};

export default RecorderControls;
