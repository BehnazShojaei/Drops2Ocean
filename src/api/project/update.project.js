async function updateProject(projectId, payload ={}) {
    //using payload better than passing single object
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;

    try{
        
        const response = await fetch(url,
            { method: "PUT" ,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),});
             
            if (!response.ok) {
                const fallbackError = "Error updating the project";
                const data = await response.json().catch(() => ({ detail: fallbackError }));
                throw new Error(data.detail || fallbackError);}
    
            return await response.json();
        
        } catch (error) {
            console.error("Update Project Error:", error.message);
            throw error;
        }
}
    

export default updateProject;

