import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import postPledge from "../api/pledge/post-pledge";

function MakePledgeForm() {

    const navigat = useNavigate();
    const { id } = useParams(); // get the id from api

    const [pledgeInfo, setPledgeInfo] = useState({
        pledgeamount: "",
        pledgecomment: "",
        anonymous: "",
        projectID: projectID, //should i get it useparam?
        supporter: userID // get it from api
        date_created: new Date().toISOString(),
    });

    const pledgeSchema = z.
    const handleChange
    const handleSubmit //navigate to right place
    // const formdata

    return

}


