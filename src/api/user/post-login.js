async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;

  try {
    
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data, so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Check if response is not ok and throw an error
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Failed to parse error message.");
      });
      const errorMessage = errorData?.detail ?? "Login failed. Please try again.";
      throw new Error(errorMessage);
    }

    // Return the JSON response if successful
    return await response.json();
  } 
  
  catch (error) {
    // Log the error for debugging (optional)
    console.error("Error during login:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

export default postLogin;
