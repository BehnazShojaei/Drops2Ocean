import React from "react";
import { useAuth } from "../../hooks/use-auth";
import useUserProfile from "../../hooks/use-userprofile";
import UserProfile from "../../components/UserProfile";
import loadingGif from "../assets/loading.webp";
import { useNavigate } from "react-router-dom";


function UserProfilePage() {
    const { auth } = useAuth(); // Get token from context
    const { profile, isLoading, error } = useUserProfile(auth.token);
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
            <UserProfile profile={userprofile} />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => navigate("/")} className="button">
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default UserProfilePage;