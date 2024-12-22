import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useProject from "../../hooks/use-project.js";
import loadingGif from "../../assets/loading.webp";
import MakePledgeForm from "../../components/PledgeForm.jsx";
import "../projectpage/ProjectPage.css";
// import ProjectCard from "../../components/ProjectCard.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import EditProjectForm from "../../components/EditProjectForm.jsx";

function ProjectPage() {
    // Get project ID from URL
    const { id: projectId } = useParams();
    const { project, isLoading, error, refetch } = useProject(projectId);
    // we can use refetch function here when we need to update the API 
    const [supporterUsernames, setSupporterUsernames] = useState({});

    // State to toggle pledge form visibility
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    // Toggle function for PledgeForm
    const handlePledgeRequest = () => {
        setShowPledgeForm(!showPledgeForm);
    };

    // Toggle Edit Form
    const toggleEditForm = () => setShowEditForm((prev) => !prev);

    // Delete Project Handler
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteProject(projectId);
                alert("Project deleted successfully!");
                window.location.href = "/";
            } catch (err) {
                setDeleteError(err.message);
            }
        }
    };

    // Fetch username dynamically based on supporter ID
    const fetchSupporterUsername = async (supporterID) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/users/${supporterID}/`;
            // console.log("Fetching from URL:", url); // Debugging the full URL
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

    // list of pledges money from anonymous or money from username 
    // toggle for project status open or closed

    return (
        <div className="project-page-container">
            {/* Project Title */}
            <h1 className="project-title">{project.title}</h1>

            {/* Status Section */}
            <div className="project-status">
                <span className={`status-badge ${project.is_open ? "open" : "closed"}`}>
                    {project.is_open ? "OPEN" : "CLOSED"}
                </span>
                <p>Created at: {new Date(project.date_created).toLocaleDateString()}</p>
            </div>

            {/* Content Grid */}
            <div className="project-content">
                {/* Left Side */}
                <div className="project-left">
                    <img src={project.image} alt="Project visual" className="project-image" />

                    {/* Progress Bar */}
                    <ProgressBar projectId={project.id} goal={project.goal} pledges={project.pledges} />

                    <button onClick={handlePledgeRequest} className="button">
                        Make a Pledge
                    </button>
                    {/* Edit and Delete Buttons */}
                    <div className="project-actions">
                        <button onClick={toggleEditForm} className="button">Edit</button>
                        <button onClick={handleDelete} className="button delete-button">Delete</button>
                    </div>
                    {deleteError && <p className="error-message">{deleteError}</p>}

                </div>

                {/* Right Side */}
                <div className="project-right">
                    <h2>Description</h2>
                    <p>{project.description}</p>

                    <h3>Pledges:</h3>
                    <ul>
                        {project.pledges && project.pledges.length > 0 ? (
                            project.pledges.map((pledge, index) => (
                                <li key={index}>
                                    ${pledge.amount} from {" "}
                                    {pledge.anonymous
                                        ? "Anonymous"
                                        : supporterUsernames[pledge.supporter] || "Loading..."}
                                    {pledge.comment && (
                                        <div className="pledge-comment">
                                            <em> "{pledge.comment}"</em>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li>No pledges yet. Be the first to support this project!</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Pledge Form */}
            {showPledgeForm && (
                <div className="pledge-form-container">
                    <MakePledgeForm onPledgeSubmitted={refetch} />
                    <button onClick={handlePledgeRequest} className="button">
                        Cancel
                    </button>
                </div>
            )}
            {/* Edit Form */}
            {showEditForm && (
                <div className="edit-form-container">
                    <EditProjectForm
                        project={project}
                        onUpdateSuccess={() => {
                            refetch();
                            toggleEditForm();
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectPage;