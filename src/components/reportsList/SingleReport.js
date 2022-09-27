import { Attractions } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, deleteOpinion, getOpinions, getOpinionsByOpinionId } from "../../store/actions/OpinionsActions";
import { deleteReport, getKindReportByReportId } from "../../store/actions/ReportAction";
import { getUserById } from "../../store/actions/UserActions";
import DeleteIcon from '@mui/icons-material/Delete';
import SingleOpinion from "../opinion/SingleOpinion";
import Poppers from "../popper/Popper";
import { Box } from "@material-ui/core";

const SingleReport = ({ item }) => {
    const [user, setUser] = useState(null);
    const [opinion, setOpinion] = useState(null);
    const [report, setReport] = useState(null);
    const attractions = useSelector(state => state.attractionArr);
    const attraction = { ...attractions.find(x => x.Id == item.AttractionId) };
    useEffect(() => {
        getUserById(item.UserId)
            .then(x => setUser(x.data))
            .catch(err => console.log(err))
        getOpinionsByOpinionId(item.OpinionId)
            .then(x => setOpinion(x.data))
            .catch(err => console.log(err))
            getKindReportByReportId(item.ReportId)
            .then(x => setReport(x.data) )
            .catch(err => console.log(err))
    }, [item]);
    const change = () => {
        // const array = opinions.filter(x => x.Id != id);
        changeStatus(opinion.Id)
        .then(x => console.log(x.data))
        .catch(err => alert("אנו מתנצלים, ישנה קלה זמנית בשרת."));
    }
    const deleteR = () => {
        deleteReport(item.Id)
        .then(x => console.log(x.data))
        .catch(err => console.log(err));
    }
    return (<div>
        <div className="opinion"> דיווח חוות דעת </div>
        <h4>המדווח: {user != null ? user.Name : null}</h4>
        <p>{attraction.CategoryName} <br /> {attraction.Name}</p>
        {report && <p> סיבת הדיווח:  {report.Name}</p>}
        {opinion && <SingleOpinion opinion={opinion} type={2}/>}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left:'4rem' }}>
          <Poppers func={change} type={3} text="הסיר את חוות הדעת" content={"הסר"}/>
          <Poppers func={deleteR} type={3} text="בטל את הדיווח" content={"בטל דיווח"}/>
        </Box>
    </div>
    )
}
export default SingleReport;