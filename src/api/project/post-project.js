import { getToken }from "../utils/localStorageUtils";

async function postProject(formData) {
    const url = `${import.meta.env.VITE_API_URL}/projects`;
    const token = getToken(); // Retrieve the token from local storage

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
                // console.log(getToken())

            },
            body: formData, // FormData will handle content-type automatically for file uploads
        });

        if (!response.ok) {
            const fallbackError = "Error trying to create a project";

            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in postProject:", error.message);
        throw error;
    }
}

export default postProject;
