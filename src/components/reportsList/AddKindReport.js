import { Button, TextField } from "@mui/material";
import { useState } from "react";
import swal from "sweetalert";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addKindReport } from "../../store/actions/ReportAction";
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import '../opinion/Opinion.css';

const AddKindReport = () => {
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
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
        <div className="addRport">
            <h4>  <AddCircleOutlineIcon onClick={() => { setFlag(!flag) }} /> 
                הוסף סוג דיווח </h4> 
            {flag && !message ? <>
                <TextField
                    id="standard-basic"
                    label="הכנס סוג דיווח"
                    name="Name"
                    variant="standard"
                    onChange={(e) => { setValue(e.target.value); if (value != "") setError(false) }} /><br />
                {error && <span style={{ color: "red" }}>יש להכניס סוג דיווח </span>} <br />
                <Button variant="contained" size="medium" onClick={add} style={{ color: "white", backgroundColor: "orange" }}>  הוסף  </Button>
            </>
                : message ?
                    <AlertMessage
                        variant={'success'}
                        children={<Alerts message={"התווסף בהצלחה!"} />} /> : null}
        </div>
    )
}
export default AddKindReport;