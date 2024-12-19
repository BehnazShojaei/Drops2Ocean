async function deleteProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
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
