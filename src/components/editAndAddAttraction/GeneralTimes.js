import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { addGeneralTimes, getGeneralTimesByPeriodId } from '../../store/actions/GeneralTimes';
import GeneralTimesDetails from './GeneralTimesDetails';
import swal from 'sweetalert';

const GeneralTimes = ({ periodId, id, type }) => {
   const [arr, setArr] = useState([]);
   const [flag, setFlag] = useState();
   useEffect(() => {
      if (type != "new")
         getGeneralTimesByPeriodId(periodId)
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
   }, [])
  
   const change = (e, index) => {
      const { name, value, type } = e.target;
      if (arr[index] == undefined) {
         const obj = { DayInWeek: index + 1, PeriodId: periodId, AttractionId: id, StartTime: '07:30', EndTime: '19:30' };
         const vec = arr;
         vec[index] = obj;
         setArr(vec)
      }
      const array = [...arr];
      const copy = { ...array[index] };
      if (type == "checkbox")
         copy[name] = e.target.checked;
      else
         copy[name] = value;
      array[index] = copy;
      setArr([...array]);
   }
   const addTimes = () => {
      console.log(arr);
      arr.forEach(element => {
         if(element.StartTime > element.EndTime){
            swal({
               title:"שים לב!",
               text: "טווח השעות אינו תקין!",
               icon: "warning",
           }); return;
         }
      });
      arr.forEach(element => {
         if(element != undefined && element.IsOpen)
         addGeneralTimes(element)
            .then(x => swal({
                    title:"התווסף בהצלחה!",
                    text: "הימים התווספו בהצלחה!",
                    icon: "success",
                }))
            .catch(err => console.log(err))
      });
   }
   return (
      <form>
         <h3>שעות פעילות האטרקציה:</h3>
         <p>שים ❤️ במידה ואינך מכניס זמן התחלה או סיום הוא מאותחל לזמנים הרשומים אוטומטית.</p>
         {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map((item, index) => {
            return <div key={index}>
               <GeneralTimesDetails addTimes={addTimes} change={change} arr={arr} index={index} setFlag={setFlag}
               pId={periodId} aId={id} setArr={setArr} flag={flag}
                  item={type != "new" ? arr.find(x => x?.Id!=undefined && x.DayInWeek - 1 == index) : null} type={type} day={item} />
            </div>
         })}

        { type=="new" && <Button variant="contained" size="medium" onClick={addTimes}> להוספת הזמנים </Button>}

      </form>
   );
}
export default GeneralTimes;