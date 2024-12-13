import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import postPledge from "../api/pledge/post-pledge";

const pledgeSchema = z.object({
    amount: z.coerce.number().positive(),
    comment: z.string(),
    anonymous: z.boolean(),
    project: z.string()

})


function MakePledgeForm({ onPledgeSubmitted }) {

    // pass in supporterID as props to check logged in user

    const { id: projectIDFromURL } = useParams();
    const navigate = useNavigate();
    // const { id: PledgeID } = useParams(); // get the id from api

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const [pledgeInfo, setPledgeInfo] = useState({
        amount: "",
        comment: "",
        anonymous: false,
        project: projectIDFromURL
    });
    // console.log(projectIDFromURL);
    // Fetch supporter username dynamically

    const fetchSupporterUsername = async (supporterID) => {
        try {
            const response = await fetch(`/users/${supporterID}`);
            if (!response.ok) throw new Error("Failed to fetch username");
            const userData = await response.json();
            return userData.username;
        } catch (error) {
            console.error(`Error fetching username for supporter ${supporterID}:`, error);
            return "Unknown User";
        }
    };

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledgeInfo((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        const formData = {
            ...pledgeInfo,
            project: projectIDFromURL,
        };
        //formdata define correct? why passing project again?

        // console.log(formData);
        const validationResult = await pledgeSchema.safeParse(formData);
        // console.log(validationResult);

        if (!validationResult.success) {

            setError("Validation failed. Please check your input");
            console.error(validationResult.error.errors);
            return;
        }
        try {

            const result = await postPledge(formData);
            const username = await fetchSupporterUsername(result.supporter);

            setSuccess(`Pledge submitted successfully! Thank you!`);

            if (onPledgeSubmitted) onPledgeSubmitted(result);

            navigate(`/project/${projectIDFromURL}`); // Redirect on success

        }
        //I need to add this post pledge somewhere and also i need to show username of the supporter not only the id number 


        /// on my backend post pledge happens on /pledges endpoint
        catch (apiError) {
            // Show the exact error message returned from the API
            setError(apiError.message);
        }

    };

    return (
        <div className="pledge-form-container">
            <h2>Make a Pledge</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={pledgeInfo.amount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="text"
                        id="comment"
                        placeholder="Add a comment"
                        value={pledgeInfo.comment}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={pledgeInfo.anonymous}
                        onChange={handleChange}
                    />
                    <label htmlFor="anonymous">Pledge Anonymously</label>
                </div>
                <button className="button" type="submit">Submit Pledge</button>
            </form>
        </div>
    );

}


export default MakePledgeForm;
