import { useEffect, useRef } from "react";

const WebcamFeed = ({ cameraOn }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    const setup = async () => {
      if (cameraOn) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } else {
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
      }
    };

    setup();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn]);

  return (
    <div className="bg-black rounded overflow-hidden">
      <video ref={videoRef} autoPlay muted className="w-full h-64 object-cover" />
    </div>
  );
};

export default WebcamFeed;
