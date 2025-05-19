import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "../components/Interview/QuestionCard";
import TextResponseBox from "../components/Interview/TextResponseBox";
import WebcamFeed from "../components/Interview/WebcamFeed";
import CodeEditor from "../components/Interview/CodeEditor";
import { FaStopCircle, FaVideoSlash, FaVideo } from "react-icons/fa";
import Timer from "../components/Shared/Timer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const InterviewRoom = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [cameraStream, setCameraStream] = useState(null);
  const [transcripts, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micRef = useRef(null);
  const speakingIntervalRef = useRef(null);
  const webcamVideoRef = useRef(null);

  // Enter fullscreen once on mount
  useEffect(() => {
    const enterFullscreen = async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (err) {
          console.error("Fullscreen error:", err);
        }
      }
    };
    enterFullscreen();
  }, []);

  // Mic setup for speech detection
  useEffect(() => {
    const setupMic = async () => {
  try {
    // Start audio stream
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    source.connect(analyserRef.current);
    micRef.current = stream;

    const data = new Uint8Array(analyserRef.current.frequencyBinCount);

    // Detect speaking activity based on volume threshold
    speakingIntervalRef.current = setInterval(() => {
      analyserRef.current.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b) / data.length;
      setIsSpeaking(avg > 10);
    }, 200);

    // ------------------------------
    // Add Web Speech API below
    // ------------------------------
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US"; // or "en-IN" or any other locale

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
      setTranscript(transcript);
      console.log("User said:", transcript); // 👈 Your logged speech
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.warn("Speech recognition ended. Restarting...");
      recognition.start(); // Restart on end for continuous listening
    };

    recognition.start(); // Start speech-to-text

  } catch (err) {
    console.error("Mic access error:", err);
  }
};


    setupMic();

    return () => {
      clearInterval(speakingIntervalRef.current);
      micRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Camera setup
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    initCamera();

    return () => {
      cameraStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Update webcam element on toggle
  useEffect(() => {
    if (webcamVideoRef.current) {
      if (cameraOn && cameraStream) {
        webcamVideoRef.current.srcObject = cameraStream;
      } else {
        webcamVideoRef.current.srcObject = null;
      }
    }
  }, [cameraOn, cameraStream]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "interview-recording.webm";
        a.click();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Screen recording error:", err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const toggleRecording = () => {
    isRecording ? handleStopRecording() : handleStartRecording();
  };

  return (
    <div className="h-screen flex flex-col bg-[#131e38] text-white">
      {/* Navbar */}
      <div className="flex bg-[#0B1120] h-15 px-4 justify-between items-center">
        <h1 className="text-xl font-bold">
          <span className="text-green-400">AI-Powered</span> Mock Interview
        </h1>
        <div className="flex gap-2">
          <button
            onClick={toggleRecording}
            className={`border px-3 py-1 rounded-md text-sm ${
              isRecording
                ? "border-red-500 text-red-400"
                : "border-gray-600 text-white"
            }`}
          >
            {isRecording ? "Stop Recording" : "Record Screen"}
          </button>

          <button
            onClick={() => setCameraOn((prev) => !prev)}
            className="border border-gray-500 px-3 py-1 rounded-md text-sm"
          >
            {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
          </button>

          <button
            className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => setShowEditor((prev) => !prev)}
          >
            {showEditor ? "Hide Code Editor" : "Show Code Editor"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="flex flex-col gap-4">
          <QuestionCard />
          <TextResponseBox isSpeaking={isSpeaking} transcript={transcripts} />
          <div className="bg-[#0B1120] p-4 rounded-lg">
            <h4 className="text-gray-400 mb-2">Code Submission</h4>
            <textarea
              className="w-full h-24 bg-transparent outline-none border border-gray-700 text-white p-2 rounded"
              placeholder="You can only paste code here. To write, open code editor from navbar."
            />
          </div>
          <button className="bg-gray-700 px-4 py-2 rounded w-fit">
            Exit Interview
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-end  rounded-lg">
            <Timer initialTime={100} />
          </div>
          <div className="bg-black rounded-lg overflow-hidden h-100 flex items-center justify-center">
            {cameraOn && cameraStream ? (
              <video
                ref={webcamVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-100 object-cover"
              />
            ) : (
              <div className="text-white text-center">
                <FaVideo className="text-5xl mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-400">Camera is off</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 p-4">
            <button
              onClick={() => setCameraOn((prev) => !prev)}
              className="flex items-center gap-2 px-3 bg-red-500 py-2 rounded-md text-sm text-white hover:bg-red-600"
            >
              {cameraOn ? <FaVideoSlash /> : <FaVideo />}
              {cameraOn ? "Camera Off" : "Camera On"}
            </button>

            <button className="flex items-center gap-2 px-3 bg-red-500 py-2 rounded-md text-sm text-white hover:bg-red-600">
              <FaStopCircle />
              Stop
            </button>
          </div>

          <div className="bg-[#0B1120] p-4 rounded-lg h-20 flex items-center justify-center">
            {isSpeaking && (
              <p className="text-green-400 text-sm tracking-widest animate-pulse">
                🎤 You are speaking...
              </p>
            )}
            {!isSpeaking && (
              <p className="text-gray-400 text-sm tracking-widest animate-pulse">
                🎤 You are not speaking...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      {showEditor && (
        <div className="bg-[#0B1120] p-5">
          <CodeEditor />
        </div>
      )}
    </div>
  );
};

export default InterviewRoom;
