import getToken from "../utils/localStorageUtils"
const token = getToken(); // Retrieve the token from local storage or state


async function postProject(formData, token) {

    const url = `${import.meta.env.VITE_API_URL}/projects`;


    try {
        const response = await fetch(url, { method: "POST" }, headers: { "Content-Type": "application/json", Authorization : `Token $t{oken}`,      body: formData,
        } );

    if (!response.ok) {
        const fallbackError = "Error trying to create a project";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    } 

    return await response.json();
}
}


export default postProject;

    

        
