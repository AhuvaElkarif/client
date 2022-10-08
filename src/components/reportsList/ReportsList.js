import { addKindReport, getReports } from "../../store/actions/ReportAction";
import { useState, useEffect } from "react";
import { changeStatus, getNotActiveOpinions } from "../../store/actions/OpinionsActions";
import { deleteReport } from "../../store/actions/ReportAction";
import SingleOpinion from "../opinion/SingleOpinion";
import Poppers from "../popper/Popper";
import { Box, Icon, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from "@mui/material";
import swal from "sweetalert";
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";

const ReportsList = () => {
    const [arr, setArr] = useState(null);
    const [opinions, setOpinions] = useState(null);
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        getNotActiveOpinions()
            .then(x => setOpinions(x.data))
            .catch(err => console.log(err))
        getReports()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, []);
    const change = (item, operation) => {
        const array = arr.filter(x => x.Id != item.Id);
        setArr(array);
        console.log(item)
        changeStatus(item.Id, operation)
            .then(x => console.log(x.data))
            .catch(err => alert("אנו מתנצלים, ישנה תקלה זמנית בשרת."));
    }
    const add = () => {
        // if (value == "") {
        //     setError(true);
        //     return;
        // }
        addKindReport({ Name: value })
            .then(x => {
                if (x.data != null) {
                    setMessage(true);
                    setFlag(false);
                }
                else
                    swal({
                        title: "סוג הדיווח לא התווסף",
                        text: "קיים סוג דיווח כזה!",
                        icon: "warning",
                        button: "סיום",
                    })
            })
            .catch(err => alert("אירעה שגיאה."))



    }
    return (
        <div className="product-list">
            {arr ? arr.map(item =>
                <div key={item.Id} className="container list">
                    {/* <SingleReport item={item}/> */}
                    <div className="opinion"> דיווח חוות דעת </div>
                    <h4>המדווח: {item.UserName}</h4>
                    <p>{item.CategoryName} <br /> {item.AttractionName}</p>
                    <p> סיבת הדיווח:  {item.ReportName}</p>
                    {opinions && <SingleOpinion opinion={{ ...opinions.find(x => x.Id == item.OpinionId) }} type={2} />}
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left: '4rem' }}>
                        <Poppers func={() => { change(item, "remove") }} type={3} text="הסיר את חוות הדעת" content={"הסר"} />
                        <Poppers func={() => { change(item, "cancel") }} type={3} text="בטל את הדיווח" content={"בטל דיווח"} />
                    </Box>
                    {/* </div> */}
                </div>) : null
            }
            <p>הוסף סוג דיווח </p> <br /> <br />
            <AddCircleOutlineIcon onClick={() => { setFlag(!flag) }} /> <br /> <br />
            {flag && !message ? <>
                <TextField
                    id="standard-basic"
                    label="הכנס סוג דיווח"
                    name="Name"
                    variant="standard"
                    onChange={(e) => { setValue(e.target.value); if (value != "") setError(false) }} /><br />
                {/* {error && <span style={{ color: "red" }}>יש להכניס סוג דיווח </span>} <br /> */}

                <Poppers
                    type={3}
                    content={"הגש"}
                    flag={value == ""}
                    func={add}
                    text="הוסיף את סוג הדיווח" /> 

            </>
                : message ?
                    <AlertMessage
                        variant={'success'}
                        children={<Alerts message={"התווסף בהצלחה!"} />} /> : null}

            <br /> <br />
        </div >
    )
}
export default ReportsList;