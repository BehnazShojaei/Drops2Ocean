import { useState, useEffect } from "react";

import getPledges from "../api/pledge/get-pledges";


export default function usePledges() {
    
    const [pledges, setPledges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        getPledges()
          .then((pledges) => {
            setPledges(pledges);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }, []);
    
      // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
      return { pledges, isLoading, error };
    }
  