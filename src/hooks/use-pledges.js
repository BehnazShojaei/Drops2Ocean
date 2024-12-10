import { useState, useEffect } from "react";
import getPledges from "../api/pledge/get-pledges";


export default function usePledges(projectId) {
    
    const [pledges, setPledges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        getPledges(projectId)
          .then((fetchedPledges) => {
            setPledges(fetchedPledges);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }, [projectId]); //re run when projectId change
    
      // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
      return { pledges, isLoading, error };
    }
  