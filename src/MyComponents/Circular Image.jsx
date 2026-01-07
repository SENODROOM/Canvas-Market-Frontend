import { useEffect, useRef, useState } from "react";
import sell from '../Images/image4.jpg';
export default function CircularGauge() {
    const progressCircleRef = useRef(null);
    const [gaugeValue] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const circle = progressCircleRef.current;
        if (!circle) return;

        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;

        const percent = isHovered ? 100 : gaugeValue;
        const offset = circumference * (1 - percent / 100);

        circle.style.strokeDashoffset = offset;
    }, [isHovered, gaugeValue]);

    return (
        <>
            <div
                className="circular-gauge-container"
                role="img"
                aria-label="Progress gauge"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <svg
                    className="circular-gauge-svg-wrapper"
                    viewBox="0 0 120 120"
                >
                    <circle
                        className="circular-gauge-track-circle"
                        cx="60"
                        cy="60"
                        r="52"
                    />
                    <circle
                        ref={progressCircleRef}
                        className="circular-gauge-progress-circle"
                        cx="60"
                        cy="60"
                        r="52"
                    />
                </svg>

                <div className="circular-gauge-label-wrapper">
                    <img id="sell-image" src={sell} alt="paint" />
                </div>
            </div>
        </>
    );
}
