import React, { useState, useEffect } from "react";
const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    function calculateTimeLeft() {
        const difference = +new Date("12-1-2023") - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }
    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return null;
        }
        return (
            <span style={{color: '#FD7E14', fontWeight: '500', fontSize: '20px'}}>
                {timeLeft[interval]} {interval} {""}
            </span>
        );
    });
    return (
        <div>
            {timerComponents.length ? (
                timerComponents
            ) : (
                <span style={{color: '#FD7E14', fontWeight: '500', fontSize: '20px'}}>Time's up!</span>
            )}
        </div>
    );
};

export default CountDown;