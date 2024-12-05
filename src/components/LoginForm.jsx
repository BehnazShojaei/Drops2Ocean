import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postLogin from "../api/user/post-login.js";
import { z } from "zod";
import { saveToken } from "../api/utils/localStorageUtils.js";

function LoginForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth(); // Removed unused `auth`

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    const loginSchema = z.object({
        username: z.string().min(3, { message: "Username is required" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
        setErrorMessage(""); // Clear error message on input change
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                setErrorMessage(error.message);
            }
            return;
        }

        postLogin(result.data.username, result.data.password)
            .then((response) => {
                saveToken(response.token);
                setAuth({
                    token: response.token,
                });
                navigate("/");
            })
            .catch(() => {
                setErrorMessage("Invalid username or password. Please try again.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                    value={credentials.username}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={credentials.password}
                />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error */}
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
