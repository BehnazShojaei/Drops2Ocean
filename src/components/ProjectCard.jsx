import { Link } from "react-router-dom";
import "./ProjectCard.css";
import { useState } from "react";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    // const imageUrl = `${projectData.image}`; where should I have a variable or just avoid the name complication and put it straight into xml

    const [showPledgeForm, setShowPledgeForm] = useState(true);

    const handlePledgeRequest = () => {
        setShowPledgeForm(false);
    }
    // console.log("fgdghj,k");

    return (

        <div className="project-card">
            <Link to={projectLink}>
                <img src={projectData.image} alt="project visual" />
                <h3>{projectData.title}</h3>
            </Link>

        </div>

    );
}

export default ProjectCard;