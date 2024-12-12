import { useState, useEffect } from "react";

import getUserProfile from "../api/user/get-user-profile";

export default function useUserProfile(token) {
  console.log("Token passed to useUserProfile:", token); // Check if token is being passed correctly

    const [userprofile, setUserProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    console.log("Token in useEffect:", token); // Verify token inside useEffect


    useEffect(() => {
        getUserProfile()
          .then((userprofile) => {
            setUserProfile(userprofile);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }, []);
    
      // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
      return { userprofile, isLoading, error };
    }