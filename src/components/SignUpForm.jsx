import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../api/user/post-signup.js";


function SignUpForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (credentials.username && credentials.password) {
            postSignUp(credentials.username, credentials.password).then(() => {
                navigate("/login");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
