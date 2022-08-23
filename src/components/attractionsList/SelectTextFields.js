import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'REC',
    label: 'מומלץ'
  },
  {
    value: 'CHE',
    label: 'מהזול ליקר',
  },
  {
    value: 'EXP',
    label: 'מהיקר לזול',
  },
  {
    value: 'CHI',
    label: 'מתאים לילדים',
  },
  {
    value: 'FAM',
    label: 'מתאים למשפחות',
  },
];

export default function SelectTextFields({handleChange}) {
  const [currency, setCurrency] = useState('REC');
  useEffect(()=>{},[currency])
  return (<>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">

      <TextField
        id="standard-select-currency"
        select
        label="סינון"
        value={currency}
        onChange={handleChange}
        // onChange={({target})=>{setCurrency(target.value); handleChange}}
        variant="standard" >

        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  </>
  );
}
