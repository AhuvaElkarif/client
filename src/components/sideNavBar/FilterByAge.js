import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { TextField } from '@material-ui/core';

const FilterByAge = ({ filterAge, x, setX }) => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(99);
    useEffect(() => {
        if (x) {
            setX(false);
            setValue1(0);
            setValue2(99);
        }
    }, [x])
    const handleInputChange = (event, type) => {
        if (type == 1)
            setValue1(event.target.value === '' ? '' : Number(event.target.value));
        else
            setValue2(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
        <div className='filter-container'>
        {/* // className='range-age'> */}
                <Typography id="range-slider" gutterBottom >
                     גילאים
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0, width: '10ch', textAlign: 'center' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="מגיל" variant="outlined" type="number"
                        onBlur={() => { filterAge([value1, value2], 5) }}
                        onChange={(e) => { handleInputChange(e, 1) }} style={{color:"orange"}}/>
                    <TextField id="outlined-basic" label="עד גיל" variant="outlined"
                        onBlur={() => { filterAge([value1, value2], 5) }} type="number"
                        onChange={(e) => { handleInputChange(e, 2) }} />
                </Box>

        </div>
    )
}
export default FilterByAge;