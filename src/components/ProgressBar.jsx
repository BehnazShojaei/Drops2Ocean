import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ goal = 0, total = 0 }) => {
    const progressPercentage = Math.min(Math.round((total / goal) * 100), 100); // Limit to 100%
    const isGoalReached = total >= goal;

    return (
        <div id="progress-container">
            <div id="progress-bar">
                <div
                    style={{ width: `${progressPercentage}%` }}
                    id="progress"
                    className={isGoalReached ? "goal-reached" : ""}
                ></div>
            </div>
            <p className="sub-text">
                {isGoalReached ? (
                    <b>Goal reached! | ${total} raised of ${goal} goal</b>
                ) : (
                    <b>${total > 0 ? total : "0"} raised</b>
                )}{" "}
                of ${goal} goal
            </p>
        </div>
    );
};

export default ProgressBar;
