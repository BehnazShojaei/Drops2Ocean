import postProject from "../api/project/post-project.js";
import "./CreateProject.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const projectSchema = z.object({

    projecttitle: z.string().min(1, { message: "Title required*" }),
    projectgoal: z.coerce.number().positive(),
    projectdescription: z.string().min(3, { message: "Description required" }),
    // projectimageurl: z.string().url({ message: "Valid URL required" }).optional(),
    // projectimage: z.string().min(1, { message: "Image field can't be empty." }),
    //for now I put image url until i figure out backend upload media
    projectimage:
        z.instanceof(File)
            .optional()
            .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
            .refine(
                (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Accepted file types: .jpg, .jpeg, .png, and .webp"
            )
});

function CreateProject() {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [projectInfo, setProjectInfo] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        // projectimage: null,
        is_open: true,
        date_created: new Date().toISOString(),
    });

    const [errorMessage, setErrorMessage] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); //adding this so later I can use submitting loader or disable button
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
                // convert image file to base64 string
                setImageb64(reader.result)
            },
            false,
        );

        if (img) {
            reader.readAsDataURL(img);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); //avoid default submission
        setErrorMessage([]); //initialize
        setIsSubmitting(true);
        console.log(imageb64)

        const result = projectSchema.safeParse(projectInfo); //check error with zod

        if (!result.success) {

            const errors = result.error.errors.map((err) => err.message);
            setErrorMessage(errors);
            setIsSubmitting(false);
            return;
        };

        try {
            // Build FormData for file uploads
            const formData = new FormData();
            formData.append("title", projectInfo.projecttitle);
            formData.append("description", projectInfo.projectdescription);
            formData.append("goal", projectInfo.projectgoal);
            formData.append("is_open", projectInfo.is_open);
            formData.append("date_created", projectInfo.date_created);


            if (imageb64) {
                formData.append("image", imageb64);
            }

            const response = await postProject(formData);
            console.log(response)

            if (response && response.id) {
                navigate(`/project/${response.id}`);

                // after submit i want to go to project/:id 
            } else {
                throw new Error("Project creation failed. Invalid response.");

            }
        } catch (error) {
            setErrorMessage([error.message ?? "Failed to create project."]);
        } finally {
            setIsSubmitting(false);
        }
    };




    //I decided to make upload image optional should take care of this section for conditional


    // now time to change backend to accept upload and not the url lol I regret exploring this option bad time management behnaz joon

    return (
        <div className="project-form-container">
            <h1>Create a New Project</h1>
            {errorMessage.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errorMessage.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="projecttitle">Title:</label>
                    <input
                        type="text"
                        id="projecttitle"
                        placeholder="Enter project title"
                        value={projectInfo.projecttitle}
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
                        value={projectInfo.projectdescription}
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
                        min="1"
                        value={projectInfo.projectgoal}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="projectimage">Upload Image:</label>
                    <input
                        type="file"
                        // type="url"
                        id="projectimage"
                        // placeholder="Enter Image URL"

                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleFileUpload}
                        required
                    />
                </div>

                <button className="button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create"}
                </button></form>
        </div >
    );
}

export default CreateProject;
