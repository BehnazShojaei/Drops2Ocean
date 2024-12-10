async function getPledges() {
    // First we create the URL for the request by using the Vite environment variable and the API endpoint.
    const url = `${import.meta.env.VITE_API_URL}/pledges`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        const fallbackError = "Error fetching pledges";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    console.log("sdfadfgdbhjbvfgyudh");      
    return await response.json();
}

export default getPledges; 



