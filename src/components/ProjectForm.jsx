import "/src/components/ProjectForm.css"
import { useState } from "react";
import LoginPage from "../pages/LoginPage.jsx";

import postProject from "../api/project/post-project.js";

function ProjectFrom(props) {


    const [credentials, setCredentials] = useState(
        {
            title: "",
            description: "",
            goal: "",
            image: "",
            is_open: "",
        }
    )

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                console.log(response);
            });
        }
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



