async function postPledge(formData) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const token = window.localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json(); // Parse response JSON once

        if (!response.ok) {
            const fallbackError = "Error making a pledge";
            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return data; // Return parsed JSON response
    } catch (error) {
        console.error("Error in postPledge:", error.message);
        throw error;
    }
}

export default postPledge;
