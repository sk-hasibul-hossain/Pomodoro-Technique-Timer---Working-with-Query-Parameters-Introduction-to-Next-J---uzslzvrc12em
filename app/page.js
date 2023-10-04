"use client";
import { useState, useEffect } from "react";
const App = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [time, setTime] = useState({ minute: workTime * 60, second: "00" });
  const [isRunning, setIsRunning] = useState(false);
  const [flag, setFalg] = useState(true);
  const [isReset, setIsReset] = useState({
    status: true,
    workTime: workTime,
    breakTime: breakTime,
    isRunning: false,
    flag: true,
  });

  if (isRunning && flag && time.minute === 0) {
    setTime({ minute: breakTime * 60, second: "00" });
    alert("work duration is over");
    setFalg(false);
  } else if (isRunning && time.minute === 0) {
    setTime({ minute: workTime * 60, second: "00" });
    alert("break duration is over");
    setFalg(true);
  }

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((oldValue) => {
          const obj = {
            minute: parseInt(oldValue.minute - 1),
            second:
              (oldValue.minute - 1) % 60 > 9
                ? (oldValue.minute - 1) % 60
                : `0${(oldValue.minute - 1) % 60}`,
          };
          return obj;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
  return (
    <div id="main">
      <h1>
        {parseInt(time.minute / 60)}:{time.second}
      </h1>
      <h2>Work-Time</h2>
      <button
        id="start-btn"
        disabled={isRunning}
        onClick={() => {
          setIsRunning(true);
          setIsReset((oldValue) => {
            return {
              ...oldValue,
              status: false,
            };
          });
        }}
      >
        start
      </button>
      <button
        id="stop-btn"
        disabled={!isRunning}
        onClick={() => {
          setIsRunning(false);
          setIsReset((oldValue) => {
            return {
              ...oldValue,
              status: false,
            };
          });
        }}
      >
        Stop
      </button>
      <button
        id="reset-btn"
        disabled={isReset.status}
        onClick={() => {
          setIsReset((oldValue) => {
            return {
              ...oldValue,
              status: true,
            };
          });
          setWorkTime(isReset.workTime);
          setBreakTime(isReset.breakTime);
          setFalg(isReset.falg);
          setIsRunning(isReset.isRunning);
          setTime({ minute: isReset.workTime * 60, second: "00" });
        }}
      >
        Reset
      </button>
      <br />
      <input
        type="number"
        id="work-duration"
        disabled={isRunning}
        onChange={(e) => {
          setWorkTime(e.target.value);
        }}
        value={workTime}
      />
      <input
        type="number"
        id="break-duration"
        disabled={isRunning}
        onChange={(e) => {
          setBreakTime(e.target.value);
        }}
        value={breakTime}
      />
      <button
        disabled={isRunning}
        id="set-btn"
        onClick={() => {
          setTime({ minute: workTime * 60, second: "00" });
          setIsReset((oldValue) => {
            return {
              ...oldValue,
              status: false,
            };
          });
        }}
      >
        set
      </button>
    </div>
  );
};

export default App;
