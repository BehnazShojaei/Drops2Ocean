import { useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project.js";
// import usePledges from "../../hooks/use-pledges.js";
import loadingGif from "../../assets/loading.webp";
import MakePledgeForm from "../../components/PledgeForm.jsx";
import "../projectpage/ProjectPage.css"

function ProjectPage() {
    // Get project ID from URL
    const { id: projectId } = useParams();


    // console.log(pledgeData);


    // Fetch project data with custom hook
    const { project, isLoading, error } = useProject(projectId);

    // console.log(project);

    // State to see toggle 
    const [showPledgeForm, setShowPledgeForm] = useState(false);

    // Toggle function for PledgeForm
    const handlePledgeRequest = () => {
        setShowPledgeForm(!showPledgeForm);
    };

    if (isLoading) {
        return <img src={loadingGif} alt="Loading..." />;
    }

    if (error) {
        return <p>Error fetching project: {projectError.message}</p>;
    }

// list of pledges money from ananymous or money from username 
// toggle for project status open or closed


    return (
        <>
            <div className="project-section">
                <h2>{project.title}</h2>
                {/* image project from whatever uploaded already */}
                <h3>Created at: {project.date_created}</h3>
                <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges && project.pledges.length > 0 ? (
                        project.pledges.map((pledgeData, index) => (
                            <li key={index}>
                                ${pledgeData.amount} from{" "}
                                {pledgeData.supporter || "Anonymous"}
                            </li>
                        ))
                    ) : (
                        <li>Be the first to support this project!</li>
                    )}
                </ul>

            </div>

            <div className="pledge-section">
                {/* Show "Make a Pledge" button if form is hidden */}
                {!showPledgeForm && (
                    <button onClick={handlePledgeRequest} className="pledge-toggle-btn">
                        Make a Pledge
                    </button>
                )}

                {/* Show the PledgeForm if button is clicked */}
                {showPledgeForm && (
                    <div className="pledge-form">
                        <MakePledgeForm onPledgeSuccess={() => refetchProject()} />


                        <button onClick={handlePledgeRequest} className="pledge-toggle-btn">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProjectPage;
