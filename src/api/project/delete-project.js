async function deleteProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;
    const token = window.localStorage.getItem("token");

    if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,

                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const fallbackError = "Error deleting the project";
            const data = await response.json().catch(() => ({ detail: fallbackError }));
            throw new Error(data.detail || fallbackError);
        }

        return null; // DELETE requests usually return no content (204 No Content)
    } catch (error) {
        console.error("Delete Project Error:", error.message);
        throw error;
    }
}

export default deleteProject;
