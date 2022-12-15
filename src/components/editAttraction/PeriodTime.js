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
const PeriodTime = ({ id, type}) => {
    const [arr, setArr] = useState([]);
    const navigate =  useNavigate();
    const [flag, setFlag] = useState(false);
    useEffect(()=>{
        if(type!="new")
        getPeriodByAttractionId(id)
        .then(x => setArr(x.data))
        .catch(err => console.log(err));
        else
        setArr(new Array(6).fill(null));
    },[])
    return (
        <form>
          {arr.map((item,index) => { return <div  key={index}> 
                <PeriodDetails period={item} id={id}/> </div>
            })}
            <Button onClick={()=>{navigate("period/"+id)}}>להוספת תקופה</Button>
            {/* {flag ? <Button variant="contained" size="medium" onClick={add}> לשעות הפעילות של תקופה זו </Button>:null} */}
        </form>
    );
}
export default PeriodTime;