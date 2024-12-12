import { Link } from "react-router-dom";
import "./ProjectCard.css";
import { useState } from "react";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    const image = `${projectData.image}`;

    const [showPledgeForm, setShowPledgeForm] = useState(true);

    const handlePledgeRequest = () => {
        setShowPledgeForm(false);
    }

    return (

        <div className="project-card">
            <Link to={projectLink}>
                <h3>{projectData.title}</h3>
                <img src={image} alt="project visual" />

            </Link>
            <p>{projectData.description}</p>
            <p>$ {projectData.goal}</p>

        </div>

    );
}

export default ProjectCard;