import { useParams } from "react-router-dom";

// import { useState } from "react";
import { useState, useEffect } from "react";

import useProject from "../../hooks/use-project.js";
// import usePledges from "../../hooks/use-pledges.js";
import loadingGif from "../../assets/loading.webp";
import MakePledgeForm from "../../components/PledgeForm.jsx";
import "../projectpage/ProjectPage.css"
import ProjectCard from "../../components/ProjectCard.jsx";

function ProjectPage() {
    // Get project ID from URL
    const { id: projectId } = useParams();
    const { project, isLoading, error, refetch } = useProject(projectId);
    // we can refetch function here then need to update api 
    const [supporterUsernames, setSupporterUsernames] = useState({});

    // State to see toggle 
    const [showPledgeForm, setShowPledgeForm] = useState(false);

    // Toggle function for PledgeForm
    const handlePledgeRequest = () => {
        setShowPledgeForm(!showPledgeForm);
    };
    // Fetch supporter username dynamically
    const fetchSupporterUsername = async (supporterID) => {
        try {
            const response = await fetch(`/users/${supporterID}`);
            if (!response.ok) throw new Error("Failed to fetch username");
            const userData = await response.json();
            return userData.username;
        } catch (error) {
            console.error(`Error fetching username for supporter ${supporterID}:`, error);
            return "Unknown User";
        }
    };

    // Populate supporter usernames for pledges
    useEffect(() => {
        if (project?.pledges) {
            const fetchUsernames = async () => {
                const usernames = { ...supporterUsernames }; // Use existing cached usernames
                for (const pledge of project.pledges) {
                    if (!pledge.anonymous && !usernames[pledge.supporter]) {
                        usernames[pledge.supporter] = await fetchSupporterUsername(pledge.supporter);
                    }
                }
                setSupporterUsernames(usernames);
            };
            fetchUsernames();
        }
    }, [project]);

    const handlePledgeSuccess = () => {
        refetch(); // Refetch project data to update pledges
        setShowPledgeForm(false); // Hide the form after submission
    };

    if (isLoading) {
        return <img src={loadingGif} alt="Loading..." />;
    }

    if (error) {
        return <p>Error fetching project: {error.message}</p>;
    }

    // list of pledges money from ananymous or money from username 
    // toggle for project status open or closed


    return (
        <>
            <div className="project-section">
                {/* <h2>{project.title}</h2> */}
                {/* <div> */}
                <ProjectCard projectData={project} />
                {/* </div> */}
                {/* image project from whatever uploaded already */}
                <h3>Created at: {project.date_created}</h3>
                <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {/* /* {project.pledges && project.pledges.length > 0 ? ( */}
                    {/* project.pledges.map((pledgeData, index) => (
                            <li key={index}>
                                ${pledgeData.amount} from {" "}
                                {pledgeData.supporter || "Anonymous"}
                            </li>

                        ))
                    ) : ( */}

                    {project.pledges && project.pledges.length > 0 ? (
                        project.pledges.map((pledgeData, index) => (
                            <li key={index}>
                                ${pledgeData.amount} from{" "}
                                {pledgeData.anonymous
                                    ? "Anonymous"
                                    : supporterUsernames[pledgeData.supporter] || "Loading..."}
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
                        <MakePledgeForm onPledgeSubmitted={handlePledgeSuccess} />

                        {/* <MakePledgeForm onPledgeSuccess={() => refetchProject()} /> */}
                        {/* should i remove refetch here, uSE A refetch project data post submit? */}
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
