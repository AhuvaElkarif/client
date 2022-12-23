import { Button, Checkbox, TextField } from "@material-ui/core";
import swal from "sweetalert";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { addPeriod, updatePeriod } from '../../store/actions/PeriodAction';
import { useParams } from "react-router-dom";
import { display } from "@mui/system";
import GeneralTimes from "./GeneralTimes";
import GeneralTimesDetails from "./GeneralTimesDetails";
import { SettingsPowerOutlined } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        width: '9rem',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
const PeriodDetails = ({ id, period, setX, type }) => {
    const classes = useStyles();
    const { attractionId , kind} = useParams();
    const [flag, setFlag] = useState(period?.Id ? true : false);
    const [submit, setSubmit] = useState(true);
    const [displayTimes, setDisplay] = useState(false);
    const [res, setRes] = useState(period);
    
    useEffect(() => {
        if (period == null || period == undefined) period = {};
        if (id == null) { id = attractionId; type=kind};
    }, [id])

    const change = (e) => {
        console.log((period))
        const { name, value, type } = e.target;
        if (type == "checkbox")
            period[name] = e.target.checked;
        else
            period[name] = value;
    }
    const addOrUpdate = () => {
        if (!(period?.TillDate && period?.FromDate)) {
            setSubmit(false);
            return;
        }
        if (setX != undefined)
            setX(true);
        if (period.Id == undefined) {
            period.AttractionId = id;
            if (period.IsOpen == undefined)
                period.IsOpen = false;
            addPeriod(period)
                .then(x => {
                    if (x.data == null)
                        swal({
                            title: "שים לב!",
                            text: "זמני התקופה אינם תקינים!",
                            icon: "warning",
                        })
                    else {
                        setFlag(true);
                        setRes(x.data);
                    }
                })
                .catch(err => console.log(err))
        }
        else
            updatePeriod(period)
                .then(x => {
                    if (x.data == null)
                        swal({
                            title: "שים לב!",
                            text: "זמני התקופה אינם תקינים!",
                            icon: "warning",
                        })
                    else
                        setFlag(true);
                })
                .catch(err => console.log(err))
    }
    return (
        <div>
            <TextField
                id="date"
                label="מתאריך"
                type="date"
                defaultValue={period ? new Date(period.FromDate).toLocaleDateString('en-CA') : new Date()}
                onChange={change}
                className={classes.textField}
                name="FromDate"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="date"
                label="עד תאריך"
                type="date"
                name="TillDate"
                defaultValue={period ? new Date(period.TillDate).toLocaleDateString('en-CA') : new Date()}
                onChange={change}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            
            <Checkbox
                defaultChecked={period?.IsOpen}
                onChange={change}
                name="IsOpen"
                type='checkbox'
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /> <span> האטרקציה פתוחה </span>
            {!submit && <p style={{ color: "red" }}> יש למלא את כל שדות התאריכים </p>}

            <Button variant="contained" color="primary" size="medium" onClick={addOrUpdate}> {period?.Id ? 'עדכן' : 'הוסף'} </Button>
            {flag && <Button variant="contained" size="medium" onClick={() => { if (period != {}) setDisplay(!displayTimes) }}> לשעות הפעילות של תקופה זו </Button>}
            {displayTimes && <GeneralTimes id={attractionId!=undefined?attractionId:id} periodId={res.Id} type={type!=undefined?type:"new"} />}
            <br /> <br />
        </div>
    );
}
export default PeriodDetails;