import React from "react";
import { useAuth } from "../hooks/use-auth.js";
import useUserProfile from "../hooks/use-userprofile";
import loadingGif from "../assets/loading.webp";
import UserProfile from "../components/UserProfile.jsx";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
    const { auth } = useAuth(); // Get the token from AuthContext
    const { profile, isLoading, error } = useUserProfile(auth.token); // Pass token to fetch user profile
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return <div style={{ color: "red", textAlign: "center" }}>Error: {error.message}</div>;
    }

    return (
        <div>
            <UserProfile profile={profile} />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => navigate("/")} className="button">
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default UserProfilePage;
