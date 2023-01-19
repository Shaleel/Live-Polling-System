import React from 'react';
import { useEffect, useState } from 'react';
import './timer.css';
import clockIcon from '../../assets/clock.svg';
const getTime = (val) => {
    let minutes = Math.floor(+val / (60 * 1000));
    let seconds = Math.floor(+val / 1000) - minutes * 60;

    if (minutes < 10 && minutes > 10) minutes = '0' + minutes;
    if (seconds < 10 && seconds > 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
};

const LiveTimer = ({ val }) => {
    const [timerVal, settimerVal] = useState(val);

    useEffect(() => {
        let interval = setInterval(() => {
            settimerVal((val) => val - 1000);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="live-timer row">
            <img src={clockIcon} />
            {getTime(timerVal)}
        </div>
    );
};

export default LiveTimer;
