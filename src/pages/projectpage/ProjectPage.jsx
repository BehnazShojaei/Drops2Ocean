import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useProject from "../../hooks/use-project.js";
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


    //Fetch username dynamically based on supporter ID
    const fetchSupporterUsername = async (supporterID) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/users/${supporterID}/`;
            console.log("Fetching from URL:", url); // Debugging the full URL
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${supporterID}`);
            }

            const userData = await response.json();
            // console.log("Fetched user data:", userData); // Debug the response
            return userData.username || "Unknown User";
        } catch (error) {
            console.error(`Error fetching username for supporter ${supporterID}:`, error);
            return "Unknown User";
        }
    };


    // Populate supporter usernames for pledges
    useEffect(() => {
        if (project?.pledges) {
            const fetchUsernames = async () => {
                const usernames = { ...supporterUsernames };
                for (const pledge of project.pledges) {
                    if (!pledge.anonymous && !usernames[pledge.supporter]) {
                        const username = await fetchSupporterUsername(pledge.supporter);
                        usernames[pledge.supporter] = username;
                    }
                }
                // console.log("Updated usernames:", usernames); // Debug the usernames state

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
            <div className="project-container">
                <h2 className="project-title">{project.title}</h2>
                <div className="progress-status">
                    <ProgressBar goal={project.goal} pledges={project.pledges ?? []} />
                    <span className={`status-badge ${project.is_open ? "" : "closed"}`}>
                        {project.is_open ? "Closed" : "Open"}
                    </span>
                </div>

                <div className="project-details">
                    <img src={project.image} alt="project visual" className="project-image" />

                    <div className="project-info">
                        <p className="project-description">{project.description}</p>

                        {/* Make a Pledge Button */}
                        <button onClick={handlePledgeRequest} className="pledge-toggle-btn">
                            Make a Pledge
                        </button>

                        {/* Pledge Form */}
                        {showPledgeForm && (
                            <MakePledgeForm onPledgeSubmitted={handlePledgeSuccess} />
                        )}

                        {/* Pledges List */}
                        <div className="pledges-section">
                            {project.pledges && project.pledges.length > 0 ? (
                                project.pledges.map((pledgeData, index) => (
                                    <div key={index} className="pledge-item">
                                        <strong>
                                            {pledgeData.anonymous
                                                ? "Anonymous"
                                                : supporterUsernames[pledgeData.supporter] || "Loading..."}
                                        </strong>{" "}
                                        pledged ${pledgeData.amount}
                                        {pledgeData.comment && (
                                            <p className="pledge-comment">{pledgeData.comment}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="no-pledges">Be the first to support this project!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default ProjectPage;
