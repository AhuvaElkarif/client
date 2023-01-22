import { Button, Checkbox, TextField } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import GeneralTimes from "./GeneralTimes";
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

    return <div>
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
        
        {period?.Id || type == "edit" && flag ?
            <Button variant="contained" color="primary"
                size="medium" onClick={() => addOrUpdate(period)}> עדכן </Button> :
            type == "edit" && <Button variant="contained" color="primary"
                size="medium" onClick={() => addOrUpdate(period)}> הוסף </Button>}

        {flag && <Button variant="contained" color="primary" size="medium"
            onClick={() => { if (period !== {}) setDisplay(!displayTimes) }}
            style={{ margin: "1rem" }}> לשעות הפעילות של תקופה זו </Button>}

        {displayTimes && <GeneralTimes onSubmit={onSubmit} periodId={period.Id}
            style={{ marginRight: "1rem" }}
            id={attractionId ? attractionId : null} type={type} />}
        <br /> <br />
    </div>
}
export default PeriodDetails;