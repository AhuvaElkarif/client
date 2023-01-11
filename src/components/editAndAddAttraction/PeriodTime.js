import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Checkbox } from '@material-ui/core';
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
    const [x, setX] = useState(type != "new" ? true : false);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (type != "new")
            getPeriodByAttractionId(id)
                .then(x => {setArr([...x.data]); if(arr.length<6) setArr([...arr,{},{},{}]) })
                .catch(err => console.log(err));
        else
            setArr(new Array(6).fill({}));
    }, []);
    const addOrUpdateP = (index, p) => {
        const vec = [...arr];
        vec[index] = p;
        setArr([...vec]);
    }
    const addGeneralTime = (index, data) => {
        const vec = [...arr];
        vec[index] = { ...vec[index], times: data };
        setArr(vec);
    }
    return (
        <ul>
            {arr.map((item, index) => {
                return <li key={index}>
                    <PeriodDetails period={{...item}} arr={arr} addOrUpdateP={(index, p) => addOrUpdateP(index, p)} onSubmit={(data) => addGeneralTime(index, data)}
                        index={index} id={id} setX={setX} type={type} /> </li>
            })}
            {/* <Button color="primary" onClick={() => { navigate("period/" + id + "/new") }}>להוספת תקופה</Button> */}
            {/* disabled={!x} */}
            <Button variant="contained" size="medium" onClick={() => {const vec = [...arr.filter(x=> x.FromDate!= undefined)]; onSubmit(vec)}} 
            style={{ backgroundColor: "orange", color: "white" }}> להמשיך לשלב הבא </Button>
        </ul>
    );
}
export default PeriodTime;