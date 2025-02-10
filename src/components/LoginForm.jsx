import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postLogin from "../api/user/post-login.js";
import { z } from "zod";

function LoginForm({ loginButton, onLogin }) {
    // const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const loginSchema = z.object({
        username: z.string().min(3, { message: "Username is required" }),
        password: z.string().min(1, { message: "Password is required" }),

    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
        setErrorMessage("");
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
                window.localStorage.setItem("token", response.token);

                setAuth({ token: response.token });
                onLogin();

                // navigate("/");
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
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {/* <button className="button" type="submit">Login</button> */}
            <div className="button-container">
                {loginButton}
            </div>
        </form>
    );
}

export default LoginForm;
