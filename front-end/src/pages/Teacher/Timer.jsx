import React from "react";
import toast from "react-hot-toast";
import clockIcon from "../../assets/clock.svg";

const Timer = ({ val, setval }) => {
  let minutes = Math.floor(+val / (60 * 1000));
  let seconds = Math.floor(+val / 1000) - minutes * 60;

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="timer inline">
      <div
        onClick={() => {
          if (val === 30 * 1000) {
            toast.error("timer connot go below 30s");

            return;
          }
          setval((val) => {
            return val - 30 * 1000;
          });
        }}
        className="decrement"
      >
        -
      </div>
      <img src={clockIcon} />
      {/* minutes:seconds */}
      {minutes}:{seconds}
      <div
        onClick={() => {
          setval((val) => {
            return val + 30 * 1000;
          });
        }}
        className="increment"
      >
        +
      </div>
    </div>
  );
};

export default Timer;
