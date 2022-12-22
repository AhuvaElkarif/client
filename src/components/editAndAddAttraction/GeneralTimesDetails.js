import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { addGeneralTimes, deleteGeneralTime, updateGeneralTime } from '../../store/actions/GeneralTimes';
import { useEffect } from 'react';
import swal from "sweetalert";
import { useState } from 'react';
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
const GeneralTimesDetails = ({ item, arr, change, type, aId, pId, index, day, setArr,flag, setFlag }) => {
    const classes = useStyles();
    const [obj, setObj] = useState({ DayInWeek: index + 1, PeriodId: pId, AttractionId: aId, StartTime: '07:30', EndTime: '19:30' });
    // const [flag, setFlag] = useState(item != undefined ? true : false);
    useEffect(() => {setFlag(item != undefined ? true : false)}, [])
    useEffect(() => {}, [flag])


    const updateAndAdd = () => {
        const o = item != undefined ? item : obj;
        if (o.EndTime < o.StartTime) {
            swal({
                title: "שים לב!",
                text: "טווח השעות באחד/יותר מהימים אינו תקין!",
                icon: "warning",
            }); return;
        }
        if (item)
            updateGeneralTime(item)
                .then(x => {
                    swal({
                        title: "עודכן בהצלחה!",
                        text: "היום התעדכן בהצלחה!",
                        icon: "success",
                    })
                })
                .catch(err => console.log(err));
        else
            addGeneralTimes(obj)
                .then(x => {
                    swal({
                        title: "התווסף בהצלחה!",
                        text: "היום התווסף בהצלחה!",
                        icon: "success",
                    })
                    const vec = [...arr, x.data];
                    setArr(vec);
                    console.log(arr)
                })
                .catch(err => console.log(err))
    }
    const handelChange = (e) => {
        e.preventDefault();
        const { name, value, type } = e.target;
        const x = { ...obj }
        if (type == "checkbox")
            x[name] = e.target.checked;
        else
            x[name] = value;
        setObj(x);
    }
    const remove = () => {
        deleteGeneralTime(item.Id)
        .then(x =>{ swal({
            title: "נמחק בהצלחה!",
            text: "היום נמחק.",
            icon: "success",
        }); 
        let vec = [...arr];
        vec = vec.filter(x => x.Id != item.Id);
        setArr(vec)
    })
        .catch(err => console.log(err));
    }
    return <div>
        <FormControlLabel
            control={
                <Switch
                    checked={item != undefined ? flag : type != "new" ? obj?.IsOpen == true : arr[index]?.IsOpen == true}
                    onChange={(e) => { item ? setFlag(!flag) : type != "new" ? handelChange(e) : change(e, index) }}
                    name="IsOpen"
                    color="primary"
                />
            }
            label={day}
        />

        {item || obj?.IsOpen || arr[index]?.IsOpen ? <>
            <TextField
                id="time"
                label="שעת פתיחה"
                type="time"
                name="StartTime"
                defaultValue={item ? item.StartTime : "07:30"}
                onChange={(e) => { item ? item.StartTime = e.target.value : type != "new" ? handelChange(e) : change(e, index) }}
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
                defaultValue={item ? item.EndTime : "19:30"}
                onChange={(e) => { item ? item.EndTime = e.target.value : type != "new" ? handelChange(e) : change(e, index) }}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <p>פתוח</p>
        </> : <p>סגור</p>}
        {type != "new" && <Button onClick={updateAndAdd}>{item ? 'עדכן' : 'הוסף'}</Button>}
        { item && <Button onClick={remove}> מחק </Button>}
    </div>
}
export default GeneralTimesDetails;