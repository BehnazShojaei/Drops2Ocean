// ProgressBar.jsx
import React from "react";
import "./ProgressBar.css";
import usePledges from "../hooks/use-pledges"

function ProgressBar({ goal, projectId }) {

    const { pledges } = usePledges(projectId)
    console.log(pledges);
    const totalRaised = pledges.reduce((sum, pledge) => sum + (pledge.amount ?? 0), 0);
    // console.log("pledge amount :", pledges);
    console.log(totalRaised);
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
