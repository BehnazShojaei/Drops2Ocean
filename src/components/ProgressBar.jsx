// ProgressBar.jsx
import React from "react";
import "./ProgressBar.css";

function ProgressBar({ goal = 0, pledges = [] }) {
    // Calculate total raised
    const totalRaised = pledges.reduce((sum, pledge) => sum + (pledge.amount ?? 0), 0);

    // Calculate progress percentage (avoid division by 0)
    const progressPercentage = goal > 0 ? Math.min((totalRaised / goal) * 100, 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            <p className="progress-text">
                ${totalRaised} raised of ${goal} goal
            </p>
        </div>
    );
}

export default ProgressBar;
