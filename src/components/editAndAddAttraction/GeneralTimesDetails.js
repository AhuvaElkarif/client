import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import './EditAttraction.css';
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
const GeneralTimesDetails = ({ item, change, type, updateAndAdd, message }) => {
    const classes = useStyles();

    return <div>
        <FormControlLabel
            control={
                <Switch
                    checked={item?.IsOpen}
                    onChange={(e) => change(e)}
                    name="IsOpen"
                    color="primary"
                />
            }
            label={item.name}
        />
        {item?.IsOpen ? <>
            <TextField
                id="time"
                label="שעת פתיחה"
                type="time"
                name="StartTime"
                defaultValue={item.StartTime ? item.StartTime : "07:30"}
                onChange={(e) => { change(e) }}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <TextField
                id="time"
                label="שעת סגירה"
                type="time"
                name="EndTime"
                defaultValue={item.EndTime ? item.EndTime : "19:30"}
                onChange={(e) => { change(e) }}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <br /> <span className='spanTimes'>פתוח</span>
        </> : <><br /> <span className='spanTimes'>סגור</span></>}
        {type != "new" && <Button onClick={() => updateAndAdd(item)} variant="contained" style={{ margin: "1rem" }}>{item?.Id ? 'עדכן' : 'הוסף'}</Button>}
        {message && <p style={{ color: "red" }}> יש להכניס נתונים </p>}
    </div>
}
export default GeneralTimesDetails;