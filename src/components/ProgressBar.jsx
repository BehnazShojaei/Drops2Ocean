import React from "react";
import "./ProgressBar.css";
import usePledges from "../hooks/use-pledges";

function ProgressBar({ goal, projectId }) {
    // Destructure totalAmount from the hook
    const { totalAmount, isLoading, error } = usePledges(projectId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading pledges!</div>;

    // Calculate progress percentage
    const progressPercentage = goal > 0 ? Math.min((totalAmount / goal) * 100, 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            <div className="progress-text">
                ${totalAmount} raised of ${goal} goal
            </div>
        </div>
    );
}

export default ProgressBar;
