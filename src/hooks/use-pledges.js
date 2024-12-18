import { useState, useEffect } from "react";
import getProject from "../api/project/get-project";

export default function usePledges(projectId) {
  const [totalAmount, setTotalAmount] = useState(0); // Total pledge amount
  const [pledges, setPledges] = useState([]);        // List of pledges
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);          // Error state

  useEffect(() => {
    if (!projectId) return; // Exit early if no projectId

    getProject(projectId)
      .then((projectData) => {
        // Extract pledges from project data
        const pledgesData = projectData.pledges || [];

        // Calculate total amount
        const sumAmount = pledgesData.reduce((total, pledge) => total + pledge.amount, 0);

        setPledges(pledgesData); // Store pledges list
        setTotalAmount(sumAmount); // Store total amount
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error); 
        setIsLoading(false);
      });
  }, [projectId]); // Re-run when projectId changes

  return { pledges, totalAmount, isLoading, error };
}
