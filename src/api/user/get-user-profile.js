async function getUserProfile(token) { 
    /// I don't know what to pass as props cz userprofile will only show after login and need the auth token
    const url = `${import.meta.env.VITE_API_URL}/profile`;

    const response = await fetch(url, { method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
     });

    if (!response.ok) {
        const fallbackError = "Error fetching user profile";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default getUserProfile;

    


