import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import postPledge from "../api/pledge/post-pledge";

function MakePledgeForm() {

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
    });
    console.log(projectIDFromURL);

    const pledgeSchema = z.object({
        amount: z.coerce.number().positive(),
        comment: z.string().optional(),
        anonymous: z.boolean(),

    })

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

        console.log(formData);
        const validationResult = pledgeSchema.safeParse(formData);

        if (!validationResult.success) {

            setError("Validation failed. Please check your input");
            console.error(validationResult.error.errors);
            return;
        }

        try {
            await postPledge(validationResult.data);
            setSuccess("Pledge submitted successfully!");
            navigate(`/project/${projectIDFromURL}`); // Redirect on success
        }
        catch (apiError) {
            // Show the exact error message returned from the API
            setError(apiError.message);
        }
    };

    //navigate to right place
    // const formdata

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
                <button type="submit">Submit Pledge</button>
            </form>
        </div>
    );

}


export default MakePledgeForm;
