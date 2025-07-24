const TextResponseBox = ({ isSpeaking, transcript }) => {
  console.log("isSpeaking", isSpeaking);
  console.log("transcript received:", transcript);
  
  return (
    <div className="bg-[#0B1120] p-4 rounded-lg">
      <h4 className="text-gray-400 mb-2">Your Response</h4>
      <textarea
        className="w-full h-45 bg-transparent outline-none border border-gray-700 text-white p-2 rounded resize-none"
        placeholder="Start speaking..."
        value={transcript || ""}
        readOnly
      />
      {isSpeaking && (
        <div className="mt-2 animate-pulse text-green-400 font-semibold text-sm">
          🎙️ You are speaking...
        </div>
      )}
      {transcript && (
        <div className="mt-2 text-xs text-gray-500">
          Characters: {transcript.length}
        </div>
      )}
    </div>
  );
};

export default TextResponseBox;
