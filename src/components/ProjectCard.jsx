import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    // const imageUrl = `${projectData.image}`; where should I have a variable or just avoid the name complication and put it straight into xml


    return (
        <div className="project-card">
            <Link to={projectLink}>
                <img src={projectData.image} />
                <h3>{projectData.title}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;