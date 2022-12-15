import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  x: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  myGrid:{
    height:'50vh'
  }
}));

export default function FullWidthGrid({images}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={`http://localhost:81/img/${images.slice(0,14)}`} alt="" className={classes.x}/>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.myGrid}>
        <img src={`http://localhost:81/img/${images.slice(15,29)}`} alt=""  className={classes.myGrid}/>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
        <img src={`http://localhost:81/img/${images.slice(29,43)}`} alt="" />
        </Grid> */}
      </Grid>
    </div>
  );
}