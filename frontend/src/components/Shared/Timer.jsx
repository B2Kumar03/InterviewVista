import React, { useEffect, useRef, useState } from 'react';

const Timer = ({ initialTime = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="text-lg font-mono p-1 bg-[#d84747] rounded w-fit text-white shadow">
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
