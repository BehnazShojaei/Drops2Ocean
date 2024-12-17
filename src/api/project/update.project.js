async function updateProject(projectId, formData) {
    if (!projectId) {
        throw new Error("Project ID is required to update a project.");
    }

    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const token = window.localStorage.getItem("token");

    if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
            },
            body: formData, 
        });

        if (!response.ok) {
            const fallbackError = "Error updating a project";

            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error in updateProject:", error.message);
        throw error;
    }
}

export default updateProject;
