import { Button, Checkbox, TextField } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
const PeriodDetails = ({ id, period, type, change, submit, addOrUpdate, onSubmit }) => {
    const classes = useStyles();
    const { attractionId, kind } = useParams();
    const [displayTimes, setDisplay] = useState(false);
    const [flag, setFlag] = useState(false);


    useEffect(() => {
        if (id == null) { id = attractionId; type = kind };
    }, [id]);
    useEffect(() => {
        if (period?.Id)
            setFlag(true);
        if (period?.FromDate && period?.TillDate && submit)
            setFlag(true);
    }, [period]);


    // const change = (e) => {
    //     const { name, value, type } = e.target;
    //     if (type == "checkbox")
    //         period[name] = e.target.checked;
    //     else
    //         if (dateToEpoch2(new Date(value)) >= dateToEpoch2(new Date()))
    //             period[name] = value;
    //     console.log(period)
    //     if (period.TillDate && period.FromDate && type=="new")
    //         addOrUpdate();
    //     else
    //         setSubmit(false);
    //     console.log(arr)
    // }
    // const addOrUpdate = () => {
    //     if (!(period?.TillDate && period?.FromDate)) {
    //         setSubmit(false);
    //         return;
    //     }
    //     if (setX != undefined)
    //         setX(true);
    //     if (period.Id == undefined)
    //         period.AttractionId = id;

    //     if (period.IsOpen == undefined)
    //         period.IsOpen = false;
    //     if (arr.find((x, ind) => (x.FromDate != undefined && ind != index && (period.FromDate >= x.FromDate && period.FromDate <= x.TillDate ||
    //         period.TillDate >= x.FromDate && period.TillDate <= x.TillDate ||
    //         x.FromDate > period.FromDate && x.TillDate < period.TillDate))) != undefined) {

    //         swal({
    //             title: "שים לב!",
    //             text: "זמני התקופה אינם תקינים!",
    //             icon: "warning",
    //         })
    //         return;
    //     }
    //     setSubmit(true);
    //     setFlag(true);
    //     if (type == "new")
    //         addOrUpdateP(index, period);
    //     else {
    //         console.log(period)
    //         if (period.Id == undefined){
    //             addPeriod(period)
    //                 .then(x => {
    //                     period.Id = x.data.Id;
    //                     swal({ icon: 'success', title: "התווסף בהצלחה!" })
    //                 })
    //                 .catch(err => console.log(err));
    //                 return;
    //             }
    //         // const vec = [...arr];
    //         // vec[index] = { ...period };
    //         // setArr([...vec]);
    //         //    else
    //         if (type == "edit")
    //             updatePeriod(period)
    //                 .then(x => {
    //                     console.log(x.data);
    //                     swal({ icon: 'success', title: "עודכן בהצלחה!" })
    //                 })
    //                 .catch(err => console.log(err))
    //     }
    // }


    return (
        <div>
            <TextField
                id="date"
                label="מתאריך"
                type="date"
                defaultValue={period ? new Date(period.FromDate).toLocaleDateString('en-CA') : new Date()}
                onChange={(e) => change(e)}
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
                onChange={(e) => change(e)}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Checkbox
                defaultChecked={period?.IsOpen}
                onChange={(e) => change(e)}
                name="IsOpen"
                type='checkbox'
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /> <span> האטרקציה פתוחה </span>
            {!submit && <p style={{ color: "red" }}> בדוק שהשדות מלאים וכן ערכיהם גדולים או שווים לתאריך הנוכחי </p>}
            {period?.Id || type == "edit" && flag ? <Button variant="contained" color="primary" size="medium" onClick={()=>addOrUpdate(period)}> עדכן </Button> :
                type == "edit" && <Button variant="contained" color="primary" size="medium" onClick={()=>addOrUpdate(period)}> הוסף </Button>}
            {flag && <Button variant="contained" color="primary" size="medium" onClick={() => { if (period != {}) setDisplay(!displayTimes) }} style={{ margin: "1rem" }}> לשעות הפעילות של תקופה זו </Button>}
            {displayTimes && <GeneralTimes onSubmit={onSubmit} periodId={period.Id} style={{ marginRight: "1rem" }}
                id={attractionId ? attractionId : null} type={type} />}
            <br /> <br />
        </div>
    );
}
export default PeriodDetails;