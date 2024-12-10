import { useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project.js";
import usePledges from "../../hooks/use-pledges.js";
import loadingGif from "../../assets/loading.webp";
import MakePledgeForm from "../../components/PledgeForm.jsx";
import "../projectpage/ProjectPage.css"

function ProjectPage() {
    // Get project ID from URL
    const { id: projecId } = useParams();


    // console.log(pledgeData);


    // Fetch project data with custom hook
    const { project, isLoading, error } = useProject(id);

    // console.log(project);

    // State to see toggle 
    const [showPledgeForm, setShowPledgeForm] = useState(!showPledgeForm);

    // Toggle function for PledgeForm
    const handlePledgeRequest = () => {
        setShowPledgeForm(true);
    };

    if (isProjectLoading || isPledgesLoading) {
        return <img src={loadingGif} alt="Loading..." />;
    }

    if (projectError) {
        return <p>Error fetching project: {projectError.message}</p>;
    }

    if (pledgesError) {
        return <p>Error fetching pledges: {pledgesError.message}</p>;
    }

    return (
        <>
            <div className="project-section">
                <h2>{project.title}</h2>
                <h3>Created at: {project.date_created}</h3>
                <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, index) => (
                        <li key={index}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    ))}
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
                        <MakePledgeForm />


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
