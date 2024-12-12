// import { useState, useEffect } from "react";
import { useState, useEffect, useCallback } from "react";

import getProject from "../api/project/get-project";

export default function useProject(projectId) {
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();


  // Define fetch logic as a function using useCallback
  const fetchProject = useCallback(() => {
    setIsLoading(true);
    getProject(projectId)
      .then((project) => {
        setProject(project);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [projectId]);

    // Run fetchProject when the hook first mounts or projectId changes
    useEffect(() => {
      fetchProject();
    }, [fetchProject]);
  
    return { project, isLoading, error, refetch: fetchProject }; // Expose refetch
  }

//   useEffect(() => {
//     // Here we pass the projectId to the getProject function.
//     getProject(projectId)
//       .then((project) => {
//         setProject(project);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setIsLoading(false);
//       });

//     // This time we pass the projectId to the dependency array so that the hook will re-run if the projectId changes.
//   }, [projectId]);

//   return { project, isLoading, error };
// }