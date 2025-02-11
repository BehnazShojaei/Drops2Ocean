
async function updateProject(projectId, payload = {}) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;
    const token = window.localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Token ${token}`, // Include token
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const fallbackError = "Error updating the project";
            const data = await response.json().catch(() => ({ detail: fallbackError }));
            throw new Error(data.detail ?? fallbackError);
        }

        return await response.json();
    } catch (error) {
        console.error("Update Project Error:", error.message);
        throw error;
    }
}

export default updateProject;
