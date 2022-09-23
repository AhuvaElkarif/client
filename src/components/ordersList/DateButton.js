import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
}));

export default function DateButton({setValue, label}) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue="2022-09-24"
        className={classes.textField}
        onBlur={(e)=>{setValue(new Date(e.target.value))}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}