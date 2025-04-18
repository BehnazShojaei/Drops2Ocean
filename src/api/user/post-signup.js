async function postSignUp(username, password) {

    // added better handling replace the fallbackerror with errormessage. 
    // I don't need to pass confirm password, it is already sorted in signup form. we are here to check the errors related to network,server, etc

    const url = `${import.meta.env.VITE_API_URL}/users/`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password}),
        });

   
        if (!response.ok) {
            const errorData = await response.json().catch(() => {
                throw new Error("Failed to parse error message.");
            });
            console.error("Backend Error Details:", errorData);

            const errorMessage = errorData?.detail ?? "Sign-up failed. Please try again.";
            throw new Error(errorMessage);
        }

      
        return await response.json();
    } catch (error) {
        console.error("Error during sign-up:", error);
        throw error; 
    }
}

export default postSignUp;


    

