async function postProject() {
    // First we create the URL for the request by using the Vite environment variable and the API endpoint.
    const url = `${import.meta.env.VITE_API_URL}/projects`;

    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
        const fallbackError = "Error making a project";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    } 

    return await response.json();
}

export default postProject;

    

        
