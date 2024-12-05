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
                <p>Willing to create a project or make a pledge? Please login below.</p>
                <LoginForm />
                <p>Or</p>
            </div>


            <div className="signup-section">
                {/* Show the button only if the form is not displayed */}
                {!showSignUp && (
                    <button onClick={handleSignUpClick} className="signup-toggle-btn">
                        Create a profile
                    </button>
                )}

                {/* Show the SignUpForm if showSignUp is true */}
                {showSignUp && (
                    <div className="signup-form">
                        <h2>Create a profile</h2>
                        <SignUpForm />
                    </div>
                )}
            </div>
        </div>
    );
}


// I like to add forgot password 
export default LoginPage;
