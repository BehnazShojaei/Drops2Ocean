import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../api/user/post-signup.js";
import { z } from "zod";


function SignUpForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const signUpSchema = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must include at least one special character." }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], // Attach error to confirmPassword
    })

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
        setErrorMessage("");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = signUpSchema.safeParse(credentials);

        if (!result.success) {
            const error = result.error.errors[0];
            setErrorMessage(error.message);
            return;
        }

        try {
            await postSignUp(credentials.username, credentials.password);
            console.log("showSomething", "signup is done");
            navigate("/login", { state: { message: "Sign-up successful! Please log in." } });
        } catch (error) {
            setErrorMessage(error.message || "Sign-up failed. Please try again.");
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
            <button className="button" type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;


// i want to add on sign up successful login page show up! or decide if you want to already sign in?