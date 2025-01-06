import { useState } from "react";
import updateProject from "../api/project/update-project.js";
import { z } from "zod";
import "./CreateProject.css";
import { useAuth } from "../hooks/use-auth.js";


const projectSchema = z.object({
    projecttitle: z.string().min(1, { message: "Title required*" }),
    projectgoal: z.coerce.number().positive(),
    projectdescription: z.string().min(3, { message: "Description required" }),
    projectimageurl: z.string().url({ message: "Valid URL required" }).optional(),
});

function EditProjectForm({ project, onUpdateSuccess }) {
    const { auth, setAuth } = useAuth();

    const [projectInfo, setProjectInfo] = useState({
        projecttitle: project.title,
        projectdescription: project.description,
        projectgoal: project.goal,
        projectimageurl: project.image_url,
    });
    const [errorMessage, setErrorMessage] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage([]);
        setIsSubmitting(true);

        const result = projectSchema.safeParse(projectInfo);


        const payload = {
            title: projectInfo.projecttitle,
            description: projectInfo.projectdescription,
            goal: projectInfo.projectgoal,
            completed: true, // If required
            image_url: projectInfo.projectimageurl, // Uncomment if needed
        };

        console.log("Payload being sent to updateProject:", payload);





        if (!result.success) {
            const errors = result.error.errors.map((err) => err.message);
            setErrorMessage(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            await updateProject(project.id, {
                title: projectInfo.projecttitle,
                description: projectInfo.projectdescription,
                goal: projectInfo.projectgoal,
                completed: true,
                // image_url: projectInfo.projectimageurl,
                // is_open: project.is_open,
            });
            alert("Project updated successfully.");
            onUpdateSuccess();
        } catch (error) {
            setErrorMessage([error.message ?? "Failed to update project."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="project-form-container">
            <h2>Edit Project</h2>
            {errorMessage.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errorMessage.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}
            <label htmlFor="projecttitle">Title:</label>
            <input
                type="text"
                id="projecttitle"
                value={projectInfo.projecttitle}
                onChange={handleChange}
                required
            />

            <label htmlFor="projectdescription">Description:</label>
            <textarea
                id="projectdescription"
                value={projectInfo.projectdescription}
                onChange={handleChange}
                required
            ></textarea>

            <label htmlFor="projectgoal">Goal:</label>
            <input
                type="number"
                id="projectgoal"
                value={projectInfo.projectgoal}
                onChange={handleChange}
                required
            />

            <label htmlFor="projectimageurl">Image URL:</label>
            <input
                type="url"
                id="projectimageurl"
                value={projectInfo.projectimageurl}
                onChange={handleChange}
            />

            <button type="submit" disabled={isSubmitting} className="button">
                {isSubmitting ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

export default EditProjectForm;
