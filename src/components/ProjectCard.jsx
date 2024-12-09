import { Link } from "react-router-dom";
import "./ProjectCard.css";
import PledgeForm from "../components/PledgeForm";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;
    // const imageUrl = `${projectData.image}`; where should I have a variable or just avoid the name complication and put it straight into xml

    const [showPledgeForm, setShowPledgeForm] = useState(false);

    const handlePledgeRequest = () => {
        setShowPledgeForm(true);
    }

    return (
        <>
            <div className="project-card">
                <Link to={projectLink}>
                    <img src={projectData.image} />
                    <h3>{projectData.title}</h3>
                </Link>

            </div>
            <div className="pledge-section">
                {/* show btn only */}
                {!showPledgeForm && (<button onClick={handlePledgeRequest} className="pledge-toggle-btn">
                    Make a Pledge
                </button>)}

                {/* show pledgeform if btn clicked */}
                {showPledgeForm && (
                    <div className="pledge-form"><h2> Make a Pledge</h2>
                        <PledgeForm />
                    </div>
                )}

            </div>
        </>

        //I want to add make a pledge button here so it shows onclick and a form pop down at the buttom on the same page. just the way i handle sign up page on login 
    );
}

export default ProjectCard;