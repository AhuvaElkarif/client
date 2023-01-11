import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './FullWidthGris.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  x: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  myGrid: {
    height: '50vh'
  }
}));

export default function FullWidthGrid({ images, setCarousel }) {
  const classes = useStyles();
  return (<div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={8} style={{width:'60vw', height:'83.3vh'}}>
      <img src={`http://localhost:81/img/${images.slice(0, 14)}`} width="100%" style={{height:"83.3vh"}} alt="" /> 
      </Grid>
     {images.length>14&& <Grid item xs={4} style={{width:'20vw', height:'60vh'}}>
       <img src={`http://localhost:81/img/${images.slice(15, 29)}`} width="100%" alt="" style={{height:'42vh'}} />
       <img src={`http://localhost:81/img/${images.slice(30, 44)}`}  width="100%" alt="" style={{height:'40.3vh'}}/>
      </Grid>}
     {images.length > 44 && <Button onClick={()=>{setCarousel(true)}} variant="contained" style={{position:'relative', right:'77rem', bottom:"3rem", opacity:"0.5"}}> 
     <AddIcon/> {(images.length-44)/15} תמונות </Button>}
    </Grid>
   </div>

  );
}
