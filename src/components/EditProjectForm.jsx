import { useState } from "react";
import updateProject from "../api/project/update-project.js";
import { z } from "zod";
import "./CreateProject.css";
import { useAuth } from "../hooks/use-auth.js";


const projectSchema = z.object({
    projecttitle: z.string().min(1, { message: "Title required*" }),
    projectgoal: z.coerce.number().positive(),
    projectdescription: z.string().min(3, { message: "Description required" }),
    projectimage: z.string().optional()
});

function EditProjectForm({ project, onUpdateSuccess }) {
    const { auth, setAuth } = useAuth();

    const [projectInfo, setProjectInfo] = useState({
        projecttitle: project.title,
        projectdescription: project.description,
        projectgoal: project.goal,
    });
    const [errorMessage, setErrorMessage] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageb64, setImageb64] = useState("");


    const handleChange = (event) => {
        const { id, value, } = event.target;
        setProjectInfo((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleFileUpload = (event) => {
        const reader = new FileReader();
        const img = event.target.files[0]

        reader.addEventListener(
            "load",
            () => {
                // convert image file to base64 string save string and show imageb64 on project card, browser will render an image 
                setImageb64(reader.result)
                console.log("Converted Image (Base64):", reader.result);

            },
            false,
        );

        if (img) {
            reader.readAsDataURL(img);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage([]);
        setIsSubmitting(true);

        console.log(imageb64);
        const result = projectSchema.safeParse({
            ...projectInfo,
            projectimage: imageb64,
        });

        const payload = {
            title: projectInfo.projecttitle,
            description: projectInfo.projectdescription,
            goal: projectInfo.projectgoal,
            completed: true,
            projectimage: imageb64
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
                image: imageb64
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

            <label htmlFor="projectimage">Upload Image:</label>
            <input
                type="file"
                id="projectimage"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileUpload}

            // value={projectInfo.projectimageurl}
            />

            <button type="submit" disabled={isSubmitting} className="button">
                {isSubmitting ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

export default EditProjectForm;
