import React, { useState } from "react";
import LoginForm from "../../components/LoginForm.jsx";

import SignUpForm from "../../components/SignUpForm";
import "/src/pages/userpage/LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setShowSignUp(!showSignUp);
    };

    const handleLogin = () => {
        navigate("/homepage", { state: { showButtons: true } }); // Pass state to homepage

    };


    return (
        <div className="login-page">
            <div className="login-section">
                <h2>Login</h2>
                <p>Willing to create a project or make a pledge? Please login below:</p>


                <div className="button-container">
                    <LoginForm onLogin={handleLogin} />
                    <p>Or</p>

                    <button onClick={handleSignUpClick} className="button secondary">
                        Create a profile
                    </button>
                </div>



                {/* <LoginForm /> */}
                {/* <button onClick={() => navigate("/forgot-password")} className="button forgot-password">
                    Forgot Password?
                </button> */}

            </div>


            {/* <div className="signup-section"> */}
            {/* Show the button only if the form is not displayed
                {!showSignUp && (
                    <button onClick={handleSignUpClick} className="button">
                        Create a profile
                    </button>
                )} */}

            {/* Show the SignUpForm if showSignUp is true */}
            {showSignUp && (
                <div className="signup-form">
       <h2>Create a profile</h2>
                    <SignUpForm />
                </div>
            )}
        </div>
        // </div>
    );
}

export default LoginPage;



//I added forgot password for now, need to add the route to main, make a page for it. 
//     return (
//         <div className="login-page">
//             <div className="login-section">

//                 <h2>Login</h2>
//                 <p>Willing to create a project or make a pledge? Please login below:</p>
//                 <LoginForm loginButton={<button className="button" type="submit">Login</button>} onLogin={handleLogin} />
//                 {/* <button onClick={() => navigate("/forgot-password")} className="button forgot-password">
//                     Forgot Password?
//                 </button> */}

//                 {/* <p>Or</p> */}
//             </div>




//             <div className="signup-section">
//                 {/* Show the button only if the form is not displayed */}
//                 {!showSignUp && (
//                     <button onClick={handleSignUpClick} className="button">
//                         Create a profile
//                     </button>
//                 )}





//                 {/* Show the SignUpForm if showSignUp is true */}
//                 {showSignUp && (
//                     <div className="signup-form">
//                         <h2>Create a profile</h2>
//                         <SignUpForm />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


// // I like to add forgot password 
// export default LoginPage;


// // I like to navigate to the homepage while appear three new button on homepage navbar, one user profile, make a pledge, create a project.