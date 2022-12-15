import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckboxList from '../sideNavBar/CheckboxList';
import { getSeasons } from '../../store/actions/SeasonAction';
import { Button, Checkbox, FormControlLabel, List, ListItemText, Switch } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { addGeneralTimes, getGeneralTimesByPeriodId } from '../../store/actions/GeneralTimes';
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
const GeneralTimes = ({ periodId, id, type }) => {
   const classes = useStyles();
   const [arr, setArr] = useState([]);
   const [switchState, setSwitchState] = React.useState(new Array(7).fill(false));
   useEffect(() => {
      getGeneralTimesByPeriodId(periodId)
         .then(x => setArr(x.data))
         .catch(err => console.log(err))
   }, [])
   console.log(arr)

   const handleChange = (event, index) => {
      const checked = event.target.checked;
      if (!checked) {
         let copy = [...arr];
         copy = copy.filter(x => x.DayInWeek - 1 != index)
         setArr([...copy]);
      }
      else {
         const obj = { DayInWeek: index + 1, PeriodId: periodId, AttractionId: id, StartTime: '07:30', EndTime: '19:30' };
         setArr([...arr, obj])
      }
      const vec = [...switchState];
      vec[index] = checked;
      setSwitchState(vec);
   };
   const change = (e, index) => {
      const { name, value } = e.target;
      const array = [...arr];
      const copy = { ...array[index] };
      copy[name] = value;
      array[index] = copy;
      setArr(array);
   }
   const addTimes = () => {
      arr.forEach(element => {
         addGeneralTimes(element)
            .then(x => console.log(x.data))
            .catch(err => console.log(err))
      });
   }
   let x;
   return (
      <form>
         <h3>שעות פתיחה:</h3>
         {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map((item, index) => {
            return <>
            { x =  arr.find(x => x.DayInWeek-1 == index)}
           <input hidden onLoad={()=>{ x= arr.find(x => x.DayInWeek-1 == index); console.log(x)}}/> 
               <FormControlLabel
                  control={
                     <Switch
                        checked={switchState[index]}
                        onChange={(e) => { handleChange(e, index) }}
                        name="checkedB"
                        color="primary"
                     />
                  }
                  label={item}
               />

               {switchState[index] ? <>
                  <TextField
                     id="time"
                     label="שעת פתיחה"
                     type="time"
                     name="StartTime"
                     defaultValue=""//{arr.find(x => x.DayInWeek-1 == index)?.StartTime :"07:30"}
                     onChange={(e) => { change(e, index) }}
                     className={classes.textField}
                     InputLabelProps={{
                        shrink: true,
                     }}
                     inputProps={{
                        step: 300, // 5 min
                     }}
                  />
                  <TextField
                     id="time"
                     label="שעת סגירה"
                     type="time"
                     name="EndTime"
                     defaultValue={x?x.EndTime:"19:30"}
                     onChange={(e) => { change(e, index) }}
                     className={classes.textField}
                     InputLabelProps={{
                        shrink: true,
                     }}
                     inputProps={{
                        step: 300, // 5 min
                     }}
                  />
                  <p>פתוח</p>
               </> : <p>סגור</p>}
               {type!="new" &&  <Button onClick={addTimes}>{x  ? 'עדכן':'הוסף'}</Button>}
            </>
         })}
         <Button variant="contained" size="medium" onClick={addTimes}> להמשיך לשלב הבא </Button>

      </form>
   );
}
export default GeneralTimes;