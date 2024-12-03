import { useState, useEffect } from "react";

import getPledge from "../api/pledge/get-pledge";

export default function usePledge() {
    
    const [pledge, setPledge] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

  useEffect(() => {

    getProject(pledgeId)
      .then((pledge) => {
        setProject(pledge);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the pledgeId to the dependency array so that the hook will re-run if the pledgeId changes.
  }, [pledgeId]);

  return { pledge, isLoading, error };
}