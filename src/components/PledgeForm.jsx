import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import postPledge from "../api/pledge/post-pledge";

const pledgeSchema = z.object({
    amount: z.coerce.number().positive(),
    comment: z.string().optional(),
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
        // console.log(formData);
        const validationResult = await pledgeSchema.safeParse(formData);
        console.log(validationResult);

        if (!validationResult.success) {

            setError("Validation failed. Please check your input");
            console.error(validationResult.error.errors);
            return;
        }
        try {
            // console.log("sdfsdffsd");
            // debugger;
            console.log("Sending formData:", formData);

            await postPledge(validationResult.data);

            setSuccess("Pledge submitted successfully!");


            navigate(`/project/${projectIDFromURL}`); // Redirect on success
            // navigate(`/pledge/${projectIDFromURL}`); // Redirect on success
        }

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
                        placeholder="Add a comment (optional)"
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
