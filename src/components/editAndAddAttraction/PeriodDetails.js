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
const PeriodDetails = ({ id, period, setX, type, arr, addOrUpdateP, index, onSubmit }) => {
    const classes = useStyles();
    const { attractionId, kind } = useParams();
    const [flag, setFlag] = useState(period?.Id ? true : false);
    const [submit, setSubmit] = useState(true);
    const [displayTimes, setDisplay] = useState(false);
    // const [res, setRes] = useState(period);

    useEffect(() => {
        if (id == null) { id = attractionId; type = kind };
    }, [id, period, index]);
    useEffect(() => { }, [period, index]);

    function dateToEpoch2(thedate) {
        return thedate.setHours(0, 0, 0, 0);
    }
    const change = (e) => {
        const { name, value, type } = e.target;
        if (type == "checkbox")
            period[name] = e.target.checked;
        else
            if (dateToEpoch2(new Date(value)) >= dateToEpoch2(new Date()))
                period[name] = value;
        console.log(period)
        if (period?.TillDate && period?.FromDate)
            addOrUpdate();
        else
            setSubmit(false);
        console.log(arr)
    }
    const addOrUpdate = () => {
        // if (!(period?.TillDate && period?.FromDate)) {
        //     setSubmit(false);
        //     return;
        // }
        if (setX != undefined)
            setX(true);
        if (period.Id == undefined)
            // {
            period.AttractionId = id;

        if (period.IsOpen == undefined)
            period.IsOpen = false;
        if (arr.find((x, ind) => (x.FromDate != undefined && ind != index && (period.FromDate >= x.FromDate && period.FromDate <= x.TillDate ||
            period.TillDate >= x.FromDate && period.TillDate <= x.TillDate ||
            x.FromDate > period.FromDate && x.TillDate < period.TillDate))) != undefined) {
            // addPeriod(period)
            //     .then(x => {
            //         if (x.data == null)
            swal({
                title: "שים לב!",
                text: "זמני התקופה אינם תקינים!",
                icon: "warning",
            })
            return;
        }
        //         else {
        //             setFlag(true);
        //             setRes(x.data);
        //         }
        //     })
        //     .catch(err => console.log(err))
        // }
        setSubmit(true);
        setFlag(true);
        addOrUpdateP(index, period);
        // const vec = [...arr];
        // vec[index] = { ...period };
        // setArr([...vec]);
        //    else
        // updatePeriod(period)
        //     .then(x => {
        //         if (x.data == null)
        //             swal({
        //                 title: "שים לב!",
        //                 text: "זמני התקופה אינם תקינים!",
        //                 icon: "warning",
        //             })
        //         else
        //             setFlag(true);
        //     })
        //     .catch(err => console.log(err))
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
            {!submit && <p style={{ color: "red" }}> בדוק שהשדות מלאים וכן ערכיהם גדולים או שווים לתאריך הנוכחי </p>}

            {/* <Button variant="contained" color="primary" size="medium" onClick={addOrUpdate}> {period?.Id ? 'עדכן' : 'הוסף'} </Button> */}
            {flag && <Button variant="contained" size="medium" onClick={() => { if (period != {}) setDisplay(!displayTimes) }}> לשעות הפעילות של תקופה זו </Button>}
            {displayTimes && <GeneralTimes onSubmit={onSubmit} periodId={period.Id} id={attractionId != undefined ? attractionId : null} type={type != undefined ? type : "new"} />}
            {/* id={attractionId != undefined ? attractionId : id} periodId={res.Id} */}
            <br /> <br />
        </div>
    );
}
export default PeriodDetails;