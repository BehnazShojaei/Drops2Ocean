import "./CreateProject.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/use-auth.js";
import { z } from "zod";
import postProject from "../api/project/post-project.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function CreateProject() {

    const navigate = useNavigate();
    // const { auth, setAuth } = useAuth();

    const [projectDetail, setProjectDetail] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        projectimage: null,
        is_open: "true",
        date_created: new Date().toISOString(),
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);



    const projectSchema = z.object({
        projecttitle: z.string().min(1, { message: "Title required*" }),
        projectgoal: z.coerce.number().positive("Goal must be a positive number"),
        projectdescription: z.string().min(3, { message: "Description required" }),
        projectimage: z.instanceof(File).optional()
            .refine(
                (file) => file?.size <= MAX_FILE_SIZE,
                "Only .jpeg, .png, and .webp formats are supported."

            ),
    });

    const handleChange = (event) => {
        const { id, value, files, type } = event.target;
        setProjectDetail((prev => ({
            ...prev,
            [id]: type === "file" ? files[0] : value, // Handle file input separately
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); //avoid default submission
        setErrorMessages(null);
        setIsSubmitting(true);

        const result = projectSchema.safeParse(projectDetail); //check error with zod

        if (!result.success) {

            const errors = result.error.errors.map((err) => err.message);

            setErrorMessages(errors);
            setIsSubmitting(false);
            return;
        };

        try {
            // Build FormData for file uploads
            const formData = new FormData();
            formData.append("title", project.projecttitle);
            formData.append("description", project.projectdescription);
            formData.append("goal", project.projectgoal);
            formData.append("is_open", true);
            formData.append("date_created", new Date().toISOString());
            if (projectDetail.projectimage) {
                formData.append("image", projectDetail.projectimage);
            }

            const response = await postProject(formData);

            if (response && response.id) {
                navigate(`/project/${response.id}`);
            } else {
                throw new Error("Project creation failed. Invalid response.");

            }
        } catch (error) {
            setErrorMessages([error.message ?? "Failed to create project."]);
        } finally {
            setIsSubmitting(false);
        }
    };


    //     const MAX_FILE_SIZE = 500000;
    // const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    // const RegistrationSchema = z.object({
    //   profileImage: z
    //     .any()
    //     .refine((files) => files?.length == 1, "Image is required.")
    //     .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    //     .refine(
    //       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //       ".jpg, .jpeg, .png and .webp files are accepted."
    //     ),
    // });



    return (
        <div className="create-project">
            <h1>Create a New Project</h1>
            {errorMessages && <p style={{ color: "red" }}>{errorMessages.map((msg, index) => (<li key={index}>{msg}</li></li>))}</p>}

<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="projecttitle">Title:</label>
        <input
            type="text"
            id="projecttitle"
            placeholder="Enter project title"
            value={projectDetail.projecttitle}
            onChange={handleChange}
            required
        />
    </div>

    <div>
        <label htmlFor="projectdescription">Description:</label>
        <textarea
            type="text"
            id="projectdescription"
            placeholder="Enter project description"
            onChange={handleChange}
            value={projectDetail.projectdescription}
            required
        ></textarea>

    </div>

    <div>
        <label htmlFor="projectgoal">Goal:</label>
        <input
            type="number"
            id="projectgoal"
            placeholder="Enter project goal"
            onChange={handleChange}
            value={projectDetail.projectgoal}
            required
        />
    </div>

    <div>
        <label htmlFor="projectimage">Upload Image:</label>
        <input
            type="file"
            id="projectimage"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleChange}
        />
    </div>

    <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Create"}
    </button></form>
        </div > 
    );
}

export default CreateProject;
