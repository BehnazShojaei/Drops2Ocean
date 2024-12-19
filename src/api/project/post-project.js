
async function postProject(formData) {
    // console.log(formData);
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.getItem("token");

    if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
    }


    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
             
                "Authorization": `Token ${token}`,
            },
            body: formData, 
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
