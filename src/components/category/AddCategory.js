import { Button, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import '../opinion/Opinion.css';
import { addCategory } from "../../store/actions/CategoryAction";

const AddCategory = () => {
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const add = () => {
        addCategory({ Name: value, Status: false })
            .then(x => {
                if (x.data) {
                    setMessage(true);
                    setFlag(false);
                }
            })
            .catch(err => alert("אירעה שגיאה."))
    }
    return <div className="addRport">
        <h4>  <AddCircleOutlineIcon onClick={() => { setFlag(!flag) }} />
            הוסף סוג קטגוריה </h4>
        {flag && !message ? <Fragment>
            <TextField
                id="standard-basic"
                label="הכנס סוג קטגוריה"
                name="Name"
                variant="standard"
                onChange={(e) => { setValue(e.target.value); if (value != "") setError(false) }} /><br />
            {error && <span style={{ color: "red" }}>יש להכניס סוג קטגוריה </span>} <br />

            <Button variant="contained"
                size="medium"
                onClick={add}
                style={{ color: "white", backgroundColor: "orange" }}>  הוסף  </Button>
        </Fragment>
            : message ?
                <AlertMessage
                    variant={'success'} setFlag={setMessage}
                    children={<Alerts message={"הוגש בהצלחה. הקטגוריה עברה לטיפול למנהל האתר."} />} /> : null}
    </div>
}
export default AddCategory;