import { useState, useEffect } from "react";

import getUserProfile from "../api/user/get-user-profile";

export default function useUserProfile() {
    
    const [userprofile, setUserProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


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