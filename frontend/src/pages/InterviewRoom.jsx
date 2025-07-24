import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Timer from "../components/Shared/Timer";
import { useNavigate, useParams } from "react-router-dom";

const InterviewRoom = () => {
  const { id } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [friendAdded, setFriendAdded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [code, setCode] = useState("// Write your code here");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const textAreaRef = useRef(null);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const roomURL = `${window.location.origin}/interview/room/12345`;

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const res = await fetch(
        `http://localhost:8080/api/interview/${id}`
      );
      const data = await res.json();
      setQuestions(data["interview"].questions);
      setResponses(
        Array(data["interview"].questions.length).fill({
          question: "",
          text: "",
          code: "",
        })
      );
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement != null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser doesn't support Speech Recognition. Try Chrome.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsRecording(true);
      setIsTyping(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setResponseText(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsTyping(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicToggle = () => {
    if (!micOn) {
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
    }
    setMicOn(!micOn);
  };

  const handleCameraToggle = async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraOn(true);
      } catch (err) {
        alert("Camera access denied.");
      }
    } else {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraOn(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomURL);
    alert("URL copied to clipboard!");
  };

  const handleToggleCodeEditor = () => {
    setShowCodeEditor((prev) => !prev);
  };

  const handleNext = () => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = {
      question: questions[currentIndex],
      text: responseText,
      code: code,
    };
    setResponses(updatedResponses);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setResponseText("");
      setCode("// Write your code here");
    }
  };

  const handlePrev = () => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = {
      text: responseText,
      code: code,
    };
    setResponses(updatedResponses);

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setResponseText(responses[prevIndex]?.text || "");
      setCode(responses[prevIndex]?.code || "// Write your code here");
    }
  };

  const handleTimeout = () => {
    alert("Time's up! Submitting your interview.");
    // Here you would typically handle the submission of the interview data
    navigate('/');
  };

  return (
    <div className="h-screen w-screen flex bg-gray-50 font-sans relative">
      {!isFullscreen && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
          <h1 className="text-3xl text-white mb-4">Please enter fullscreen mode</h1>
          <button
            onClick={enterFullscreen}
            className="bg-blue-600 px-6 py-3 rounded text-white text-lg hover:bg-blue-700"
          >
            Enter Fullscreen
          </button>
        </div>
      )}
      {/* Left Panel */}
      <div className="w-1/2 h-full bg-[#eef2fb] flex flex-col p-6 gap-6 overflow-y-auto">
        <div className="text-2xl font-bold text-[#0033A0]">
          🎥 InterviewVista
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">📝 Question</h2>
          {questions.length > 0 && (
            <div className="bg-[#0B1120] p-4 rounded-lg">
              <h3 className="text-sm text-gray-400 mb-2">
                Current Question {currentIndex + 1} of {questions.length}
              </h3>
              <p className="text-white">{questions[currentIndex]}</p>
            </div>
          )}
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">🗣️ Your Response</h2>
          <textarea
            ref={textAreaRef}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className={`w-full text-black h-32 p-3 border rounded resize-none focus:outline-none transition-all duration-300 ${
              isTyping
                ? "border-blue-500 ring-2 ring-blue-300 animate-pulse"
                : "border-gray-300"
            }`}
            placeholder="Type or speak your response..."
          />
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">💻 Code Response</h2>
          <Editor
            height="200px"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>

        <div className="flex justify-between mt-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded ${
              currentIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}
          >
            ⬅ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`px-4 py-2 rounded ${
              currentIndex === questions.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Next ➡
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 h-full bg-[#1e293b] p-6 text-white flex flex-col justify-between">
        <div className="flex justify-end gap-5 items-center">
          <Timer initialTime={1800} onComplete={handleTimeout} />
          <button
            onClick={handleToggleCodeEditor}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
          >
            {showCodeEditor ? "Hide Code Editor" : "Open Code Editor"}
          </button>
        </div>

        <div>
          <div className="h-80 w-full flex items-center justify-center">
            <div className="w-[50%] h-80 bg-black flex items-center justify-center relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded"
              />
              {!cameraOn && (
                <span className="absolute text-white">Camera off</span>
              )}
            </div>

            {friendAdded ? (
              <div className="w-[100%] h-80 bg-black flex items-center justify-center">
                <span>Friend's Camera View</span>
              </div>
            ) : (
              <div >
               
                  
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-3">
            <button
              onClick={handleCameraToggle}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              {cameraOn ? "Off Camera" : "On Camera"}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-2">🎙️ Voice Input (with speaking animation)</h3>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleMicToggle}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              {micOn ? "Stop Mic" : "Start Mic"}
            </button>
            {isRecording && (
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
            )}
          </div>
        </div>

        <div>
          <button className="w-full bg-black py-3 rounded hover:bg-gray-800 text-white text-lg font-semibold">
            🚪 Exit Room
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-black relative">
            <h2 className="text-xl font-bold mb-4">👥 Invite Your Friend</h2>
            <p className="mb-3">Share this URL to invite your friend:</p>
            <div className="bg-gray-100 p-2 rounded flex justify-between items-center mb-4">
              <input
                type="text"
                readOnly
                value={roomURL}
                className="bg-transparent w-full text-sm outline-none"
              />
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setFriendAdded(true);
                  setShowModal(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Done
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewRoom;
