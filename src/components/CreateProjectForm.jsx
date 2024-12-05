import "./ProjectForm.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postProject from "../api/project/post-project.js";
import { z } from "zod";
import moment from "moment";




function CreateProjectForm(props) {


    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [project, setProject] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        projectimage: null,
        is_open: "true",
        date_created: moment().toISOString(),
    });

    const projectSchema = z.object({
        projecttitle: z.string().min(1, { message: "Title must not be empty" }),
        projectgoal: z.string().regex(/^\d+$/, { message: "Goal must be a positive integer" }),
        projectdescription: z.string().min(3, { message: "Description must not be empty" }),
        // projectimage: z.instanceof(File).optional(),
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter project title"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="description"
                        id="description"
                        placeholder="Project Description"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="goal">Goal:</label>
                    <input
                        type="goal"
                        id="goal"
                        placeholder="Goal"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="isopen">Is Open:</label>
                    <input
                        type="isopen"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="image"
                        id="image"
                        placeholder="Image url"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>

            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link> </p>
        </>);
}

export default CreateProjectForm;


