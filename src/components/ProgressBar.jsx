// ProgressBar.jsx
import React from "react";
import "./ProgressBar.css";
import usePledges from "../hooks/use-pledges"
function ProgressBar({ goal = 0 }) {

    const { pledges } = usePledges()

    // Calculate total raised
    const totalRaised = pledges.reduce((sum, pledge) => sum + (pledge.amount ?? 0), 0);
    // console.log("pledge amount :", pledges);
    // Calculate progress percentage (avoid division by 0)
    const progressPercentage = goal > 0 ? Math.min((totalRaised / goal) * 100, 100) : 0;


    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            <div className="progress-text">
                ${totalRaised} raised of ${goal} goal
            </div>
        </div>
    );
}


export default ProgressBar;
