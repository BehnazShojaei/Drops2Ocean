import React from "react";
import useUserProfile from "../..use-userprofile.js";
import { useNavigate } from "react-router-dom";
import loadingGif from "../../assets/loading.webp"
import CreateProjectForm from "../../components/CreateProject.jsx";

function UserProfilePage() {

    const { userprofile, isLoading, error } = useUserProfile();
    const navigate = useNavigate();

    if (isLoading) {
        return (<div>
            <img src={loadingGif} alt="Loading..." />

        </div>);
    }

    if (error) {
        return <div> Error : {error.message}</div>;
    }

    return (
        // I am trying to make changes here to check the sync with main 
    )

}