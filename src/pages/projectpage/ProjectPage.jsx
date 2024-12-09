import { useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project.js";
import loadingGif from "../../assets/loading.webp";
import MakePledgeForm from "../../components/PledgeForm.jsx";

function ProjectPage() {
    // Get project ID from URL
    const { id } = useParams();

    // Fetch project data with custom hook
    const { project, isLoading, error } = useProject(id);

    // State to see toggle 
    const [showPledgeForm, setShowPledgeForm] = useState(false);

    // Toggle function for PledgeForm
    const handlePledgeRequest = () => {
        setShowPledgeForm(!showPledgeForm);
    };

    if (isLoading) {
        return (
            <div>
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <div className="project-section">
                <h2>{project.title}</h2>
                <h3>Created at: {project.date_created}</h3>
                <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, key) => (
                        <li key={key}>
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
                        <h2>Make a Pledge</h2>
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
