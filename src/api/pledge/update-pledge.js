async function updatePledge(pledgeId, updatedData) {
    // Validate if pledgeId and updatedData are provided
    if (!pledgeId) {
        throw new Error("Pledge ID is required to update a pledge.");
    }
    if (!updatedData) {
        throw new Error("Updated data is required to update a pledge.");
    }

    // Construct the API URL
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}`;
    const token = window.localStorage.getItem("token");

    if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(updatedData), // Attach the update payload
        });

        const data = await response.json(); // Parse response JSON once

        if (!response.ok) {
            const fallbackError = "Error updating the pledge";
            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return data; // Return the updated pledge data
    } catch (error) {
        console.error("Error in updatePledge:", error.message);
        throw error;
    }
}

export default updatePledge;
