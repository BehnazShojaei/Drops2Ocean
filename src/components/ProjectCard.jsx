import { Link } from "react-router-dom";
import "./ProjectCard.css";
// import { useState } from "react";
import ProgressBar from "./ProgressBar.jsx";


function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    const image = `${projectData.image}` ?? "";

    const totalRaised = projectData.pledges?.reduce(
        (sum, pledge) => sum + pledge.amount,
        0
    ) || 0;

    return (

        <div className="project-card">
            <Link to={projectLink}>
                <h3>{projectData.title}</h3>
                <img src={image} alt="project visual" />

            </Link>

            <p>Goal: ${projectData.goal}</p>
            <ProgressBar goal={projectData.goal} total={totalRaised} />

        </div>

    );
}

export default ProjectCard;