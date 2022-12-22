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
const PeriodTime = ({ id, type, onSubmit}) => {
    const [arr, setArr] = useState([]);
    const [x,setX] = useState(type!="new"?true:false);
    const navigate =  useNavigate();
    useEffect(()=>{
        if(type!="new")
        getPeriodByAttractionId(id)
        .then(x => setArr(x.data))
        .catch(err => console.log(err));
        else
        setArr(new Array(6).fill(null));
    },[])
    return (
        <ul>
          {arr.map((item,index) => { return <li  key={index}>  
                <PeriodDetails period={item} id={id} setX={setX} type={type}/> </li>
            })}
            <Button onClick={()=>{navigate("period/"+id+"/new")}}>להוספת תקופה</Button>
           <Button variant="contained" size="medium" onClick={onSubmit} disabled={!x}> להמשיך לשלב הבא </Button>
        </ul>
    );
}
export default PeriodTime;