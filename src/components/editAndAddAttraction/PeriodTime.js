import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { addPeriod, updatePeriod } from '../../store/actions/PeriodAction';
import swal from "sweetalert";
import { Button } from '@material-ui/core';
import { getPeriodByAttractionId } from '../../store/actions/PeriodAction';
import { useEffect } from 'react';
import PeriodDetails from './PeriodDetails';
import { useNavigate } from 'react-router-dom';
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
const PeriodTime = ({ id, type, onSubmit }) => {
    const [arr, setArr] = useState([]);
    const [submit, setSubmit] = useState();
    const [kind, setKind] = useState(type);
    const navigate = useNavigate();
    useEffect(() => {
        if (type != "new")
            getPeriodByAttractionId(id)
                .then(x => {
                    setArr([...x.data, {}, {}]);
                    setSubmit(new Array(x.data.length + 2).fill(true));
                })
                .catch(err => console.log(err));
        else {
            setArr(new Array(6).fill({}));
            setSubmit(new Array(6).fill(true));
        }
    }, []);
    
    function dateToEpoch2(thedate) {
        return thedate.setHours(0, 0, 0, 0);
    }
    const change = (e, index) => {
        const array = [...arr];
        let copy = { ...array[index] };
        const { name, value, type } = e.target;
        if (type === "checkbox")
            copy[name] = e.target.checked;
        else
            if (dateToEpoch2(new Date(value)) >= dateToEpoch2(new Date()))
                copy[name] = value;
        if (copy.TillDate && copy.FromDate && kind == "new")
            addOrUpdate(copy, index);
        else {
            const vec = [...submit];
            vec[index] = false
            setSubmit(vec);
        }
        array[index] = copy;
        setArr([...array]);
    }
    const addOrUpdate = (item, index) => {
        if (!item.Id)
            item.AttractionId = id;
        if (!item.IsOpen)
            item.IsOpen = false;
        if (arr.find((x, ind) => (x.FromDate != undefined && ind != index && (item.FromDate >= x.FromDate && item.FromDate <= x.TillDate ||
            item.TillDate >= x.FromDate && item.TillDate <= x.TillDate ||
            x.FromDate > item.FromDate && x.TillDate < item.TillDate))) != undefined) {

            swal({
                title: "שים לב!",
                text: "זמני התקופה אינם תקינים!",
                icon: "warning",
            })
            return;
        }
        const vec = [...submit];
        vec[index] = true
        setSubmit(vec);
        if (type == "new")
            addOrUpdateP(index, item);
        else {
            if (!item.Id) {
                addPeriod(item)
                    .then(x => {
                        // item.Id = x.data.Id;
                        const vec = [...arr];
                        vec[index]  = x.data;
                        setArr([...vec]);
                        swal({ icon: 'success', title: "התווסף בהצלחה!" })
                    })
                    .catch(err => console.log(err));
                return;
            }
            if (type == "edit")
                updatePeriod(item)
                    .then(x => {
                        console.log(x.data);
                        swal({ icon: 'success', title: "עודכן בהצלחה!" })
                    })
                    .catch(err => console.log(err))
        }
    }

    const addOrUpdateP = (index, p) => {
        const vec = [...arr];
        vec[index] = p;
        setArr([...vec]);
    }
    const addGeneralTime = (index, data) => {
        const vec = [...arr];
        data = data.filter(x => x.StartTime);
        vec[index] = { ...vec[index], GeneralTimes: data };
        setArr(vec);
    }
    const handleClick = () => {
        const vec = [...arr.filter(x => x.FromDate != undefined)];
        onSubmit(vec)
    }
    return (
        <ul>
            {arr && submit? arr.map((item, index) => {
                return <li key={index}>
                    <PeriodDetails period={item} change={(e) => { change(e, index) }} submit={submit[index]}
                        addOrUpdate={(p) => addOrUpdate(p, index)} onSubmit={(data) => addGeneralTime(index, data)}
                        id={id} type={type} /> </li>
            }):null}
            {/* <Button color="primary" onClick={() => { navigate("period/" + id + "/new") }}>להוספת תקופה</Button> */}
            {/* disabled={!x} */}
            <Button variant="contained" size="medium" onClick={handleClick}
                style={{ backgroundColor: "orange", color: "white" }}> להמשיך לשלב הבא </Button>
        </ul>
    );
}
export default PeriodTime;