import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import postPledge from "../api/pledge/post-pledge";

function MakePledgeForm({ projectData, supporterID }) {

    // pass in supporterID as props to check logged in user
    //pass projectData ? or should i get it only from url? it supposed to be there already

    const { id: projectIDFromURL } = useParams();
    const navigate = useNavigate();
    // const { id: PledgeID } = useParams(); // get the id from api

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const [pledgeInfo, setPledgeInfo] = useState({
        pledgeamount: "",
        pledgecomment: "",
        anonymous: false,
        // projectID: projectID?.id ?? projectIDFromURL, //should i get it useparam? how to check if it is there?
        // supporter: supporterID, // get it from api??
        date_created: new Date().toISOString(),
    });


    const pledgeSchema = z.object({
        pledgeamount: z.coerce.number().positive("Goal must be a positive number"),
        pledgecomment: z.string().optional(),
        anonymous: z.boolean(),
        project: z.number(),
        supporter: z.number(),
        date_created: z.string(),

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
            project: Number(projectID),
            supporter: supporterID,
        };

        const validationResult = pledgeSchema.safeParse(formData);

        if (!validationResult.success) {

            setError("Validation failed. Please check your input");
            console.error(validationResult.error.errors);
            return;
        }

        try {
            await postPledge(validationResult.data);
            setSuccess("Pledge submitted successfully!");
            navigate(`/projects/${projectID}`); // Redirect on success
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
                    <label htmlFor="pledgeamount">Amount:</label>
                    <input
                        type="number"
                        id="pledgeamount"
                        placeholder="Enter amount"
                        value={pledgeInfo.pledgeamount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="pledgecomment">Comment:</label>
                    <input
                        type="text"
                        id="pledgecomment"
                        placeholder="Add a comment (optional)"
                        value={pledgeInfo.pledgecomment}
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
