import { Link } from "react-router-dom";
import "./ProjectCard.css";
// import { useState } from "react";
import ProgressBar from "./ProgressBar.jsx";


function ProjectCard(props) {
    const { projectData, customClass = "" } = props;
    const projectLink = `project/${projectData.id}`;
    const image = `${projectData.image}` ?? "";


    return (

        <div className="project-card">
            <Link to={projectLink}>
                <h3>{projectData.title}</h3>
                <img src={image} alt="project visual" />
            </Link>

            <ProgressBar goal={projectData.goal} pledges={projectData.pledges ?? []} />

        </div>

    );
}

export default ProjectCard;