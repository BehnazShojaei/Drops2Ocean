async function updateProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;

    const response = await fetch(url, { method: "PUT" });

    if (!response.ok) {
        const fallbackError = "Error updating a project";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default updateProject;

    


  