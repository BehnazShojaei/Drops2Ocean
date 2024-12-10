async function getPledges(projectId = null) {
    // First we create the URL for the request by using the Vite environment variable and the API endpoint.
    let url = `${import.meta.env.VITE_API_URL}/pledges`;

    if (projectId){
        url += `?project=${projectId}`; 
    } //if projectId is provided adding a filter to show only pledges for the projectId

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        const fallbackError = "Error fetching pledges";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
          
    return await response.json();
}

export default getPledges; 



