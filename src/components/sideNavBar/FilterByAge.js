import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

const InputAge = ({classes, value, handleBlur, handleInputChange, type}) => {
    return(
        <Input
        className={classes.input}
        value={value}
        margin="dense"
        onChange={(e)=>{handleInputChange(e,type)}}
        onBlur={handleBlur}
        inputProps={{
            step: 1,
            min: 0,
            max: 99,
            type: 'number',
        }}
    />
    )
}
const FilterByAge = ({filterAge, x, setX}) => {
    const classes = useStyles();
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(99);
    useEffect(()=>{
        if(x){
            setX(false);
            setValue1(0);
            setValue2(99);
        }
    },[x])
    const handleInputChange = (event, type) => {
        if(type==1)
        setValue1(event.target.value === '' ? '' : Number(event.target.value));
        else
        setValue2(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                טווח גילאים
            </Typography>

            <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                מגיל:
                </Grid>
                <Grid item xs={3}>
                    <InputAge classes={classes} handleBlur={()=>{filterAge([value1,value2], 5)}} 
                        handleInputChange={handleInputChange} value={value1} type={1}/>
                </Grid>
                <Grid item xs={3}>
                    עד גיל:
                </Grid>
                <Grid item xs={3}>                   
                 <InputAge classes={classes} handleBlur={()=>{filterAge([value1,value2], 5)}} 
                        handleInputChange={handleInputChange} value={value2} type={2}/>
                </Grid>
            </Grid>
        </div>
    )
}
export default FilterByAge;