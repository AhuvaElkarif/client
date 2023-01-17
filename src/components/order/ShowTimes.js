import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ShowTimes({arr, setStart}) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">בחר זמן להתחלת האטרקציה:</FormLabel>
      <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              // value={value}
              onChange={e => setStart(e.target.value)} >
              {arr.map(item => <FormControlLabel key={item.start} value={item.start}
                control={<Radio />} label={item.start.slice(0,5)} style={{margin:"0.3rem"}}/>)}
            </RadioGroup> 
    </FormControl>
  );
}