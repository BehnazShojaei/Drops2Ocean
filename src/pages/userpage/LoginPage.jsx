import React, { useState } from "react";
import LoginForm from "/src/components/LoginForm.jsx";
import SignUpForm from "../../components/SignUpForm";
import "/src/pages/userpage/LoginPage.css";

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    return (
        <div className="login-page">
            <div className="login-section">
                <h2>Login</h2>
                <LoginForm />
            </div>


            <div className="signup-section">
                {/* Show the button only if the form is not displayed */}
                {!showSignUp && (
                    <button onClick={handleSignUpClick} className="signup-toggle-btn">
                        Sign Up
                    </button>
                )}

                {/* Show the SignUpForm if showSignUp is true */}
                {showSignUp && (
                    <div className="signup-form">
                        <h2>Sign Up</h2>
                        <SignUpForm />
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
