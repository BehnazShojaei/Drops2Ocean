async function postPledge(formData) {
    
    const url = `${import.meta.env.VITE_API_URL}/pledges`;
    const token = window.localStorage.getItem("token");
 // Check if the token exists
    if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
    }
    try {
        
        const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(formData), // Convert to JSON format
    });
        if (!response.ok) {
            const fallbackError = `Error making a pledge`;
            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }
        console.log(response);
        return await response.json();
    }catch (error) {
        console.error("Error in postPledge:", error.message);throw error;
  }
}

export default postPledge;

    