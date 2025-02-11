async function getProjects() {

    const url = `${import.meta.env.VITE_API_URL}/projects/`;

    try {
      
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        const fallbackError = "Error fetching projects";
        const data = await response.json().catch(() => {
          throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Log network or other unexpected errors
    console.error("Network or fetch error in getProjects:", error.message);
    throw new Error("An unexpected error occurred while fetching projects. Please try again later.");
}
}

export default getProjects;