// define the token here out of asyn function 


async function postPledge() {
    // First we create the URL for the request by using the Vite environment variable and the API endpoint.
   
   
   
    const url = `${import.meta.env.VITE_API_URL}/pledges`;


    // the request body 
    // search on reload page in react

    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
        const fallbackError = `Error making a pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default postPledge;

    