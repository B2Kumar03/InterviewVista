// SpeechToText.js
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Speech to Text</h2>
      <p className="mb-4">
        🎤 Mic:{" "}
        <span className={listening ? "text-green-400" : "text-red-400"}>
          {listening ? "ON" : "OFF"}
        </span>
      </p>
      <div className="space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-green-500 rounded"
          onClick={SpeechRecognition.startListening}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 rounded"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </button>
        <button
          className="px-4 py-2 bg-red-500 rounded"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>
      <textarea
        className="w-full h-32 p-2 bg-black text-white rounded border border-gray-700"
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default SpeechToText;
