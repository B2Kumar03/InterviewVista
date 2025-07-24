import React, { useEffect } from "react";

const AITalkingAvatar = ({ isSpeaking }) => (
  <div className="flex flex-col items-center mb-2">
    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center animate-bounce ${isSpeaking ? 'shadow-lg' : ''}`}>
      <span className="text-3xl">🤖</span>
    </div>
    <span className="text-xs text-blue-300 mt-1 animate-pulse">AI is reading...</span>
  </div>
);

const speakText = (text) => {
  if (window.speechSynthesis) {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const QuestionCard = ({ 
  question, 
  current, 
  total, 
  answer, 
  onSave, 
  onNext, 
  onPrev, 
  disableNext, 
  disablePrev, 
  showAlert, 
  animateNext, 
  saveConfirmation,
  isSpeechPaused,
  onStartSpeaking,
  onResetAnswer
}) => {
  useEffect(() => {
    if (question) speakText(question);
  }, [question]);

  return (
    <div className="bg-[#0B1120] p-4 rounded-lg">
      <AITalkingAvatar isSpeaking={!!question} />
      <h3 className="text-sm text-gray-400 mb-2">
        Current Question {current} of {total}
      </h3>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-white select-none flex-1">
          {question || "No question available."}
        </p>
        {question && (
          <button
            className="ml-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
            onClick={() => speakText(question)}
            title="Replay AI reading"
          >
            🔊 Replay
          </button>
        )}
      </div>
      <div className="w-full mb-2 p-2 rounded bg-[#1a2236] text-white border border-gray-700 min-h-[64px]">
        {answer ? answer : <span className="text-gray-400">Your spoken response will appear here...</span>}
      </div>
      {saveConfirmation && (
        <div className="text-green-400 text-xs mb-2 animate-bounce">Response saved!</div>
      )}
      {showAlert && (
        <div className="text-red-500 text-xs mb-2 animate-pulse">Please provide and save your response before proceeding.</div>
      )}
      <div className="flex gap-2 flex-wrap">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isSpeechPaused 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
          onClick={onStartSpeaking}
        >
          {isSpeechPaused ? "🎤 Start Speaking" : "⏸️ Stop Speaking"}
        </button>
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={onResetAnswer}
        >
          🔄 Reset Answer
        </button>
        <button
          className="bg-[#6b2a22] hover:bg-[#e17b6e] text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={onSave}
        >
          💾 Save Response
        </button>
        <button
          className="bg-blue-600 px-3 py-2 rounded text-sm disabled:opacity-50 font-medium"
          onClick={onPrev}
          disabled={disablePrev}
        >
          ⬅️ Previous
        </button>
        <button
          className={`bg-green-600 px-3 py-2 rounded text-sm disabled:opacity-50 font-medium transition-transform ${animateNext ? 'animate-bounce' : ''}`}
          onClick={onNext}
          disabled={disableNext}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
