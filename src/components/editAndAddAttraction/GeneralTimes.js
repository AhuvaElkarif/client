import React, { useEffect, useState } from 'react';
import { addGeneralTimes, deleteGeneralTime, getGeneralTimesByPeriodId, updateGeneralTime } from '../../store/actions/GeneralTimes';
import GeneralTimesDetails from './GeneralTimesDetails';
import swal from 'sweetalert';

const GeneralTimes = ({ onSubmit, periodId, type }) => {
   const [arr, setArr] = useState(null);
   const [message, setMessage] = useState(false);
   useEffect(() => {
      const names = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
      if (periodId) {
         getGeneralTimesByPeriodId(periodId)
            .then(data => {
               const a = names.map((name, i) => ({ ...(data.data.find(x => x.Id && x.DayInWeek - 1 == i)), name }))
               setArr(a)
            })
            .catch(err => console.log(err))
      }
      else {
         setArr(names.map(x => ({ name: x })));
      }
   }, [periodId]);

   useEffect(() => {
      if (arr && arr.length > 0 && type == "new") {
         onSubmit(arr);
      }
   }, [arr])


   const change = (e, index) => {
      const { name, value, type } = e.target;
      console.log("change", name, value, type, index)
      const array = [...arr];

      let copy = { ...array[index] };
      if (!copy.StartTime) {
         copy = { DayInWeek: index + 1, PeriodId: periodId, StartTime: '07:30', EndTime: '19:30', IsOpen: true, name: copy.name };

      }
      if (type == "checkbox") {
         copy[name] = e.target.checked;
      }
      else {
         copy[name] = value;
      }
      array[index] = copy;
      console.log(array)
      setArr([...array]);
   }
   const addTimes = () => {
      console.log(arr);
      // if(arr.length==0){
      //         swal({
      //          title:"שים לב!",
      //          text: "לא הוכנסו נתונים, נא הכנס על מנת להוסיף.",
      //          icon: "warning",
      //      }); return;}
      // arr.forEach(element => {
      //    if(element.StartTime > element.EndTime){
      //       swal({
      //          title:"שים לב!",
      //          text: "טווח השעות אינו תקין!",
      //          icon: "warning",
      //      }); return;
      //    }
      // });
      onSubmit(arr);
      swal({
         title: "התעדכן בהצלחה!",
         text: "הימים התעדכנו בהצלחה!",
         icon: "success",
      })
      arr.forEach(element => {
         if (element != undefined && element.IsOpen)
            addGeneralTimes(element)
               .then(x => swal({
                  title: "התווסף בהצלחה!",
                  text: "הימים התווספו בהצלחה!",
                  icon: "success",
               }))
               .catch(err => console.log(err))
      });
   }
   const remove = (item) => {
      deleteGeneralTime(item.Id)
         .then(x => {
            swal({
               title: "נמחק בהצלחה!",
               text: "היום נמחק.",
               icon: "success",
            });
            let vec = [...arr];
            vec = vec.filter(x => x.Id != item.Id);
            setArr([...vec]);
         })
         .catch(err => console.log(err));
   }
   const updateAndAdd = (index, item) => {
      if (item.EndTime < item.StartTime) {
          swal({
              title: "שים לב!",
              text: "טווח השעות אינו תקין!",
              icon: "warning",
          }); return;
      }
      console.log(item)
      if (!item.StartTime) {// && arr[index] == undefined) {
          setMessage(true);
         return;
      }
      setMessage(false);
      if (item.Id) {
         item.PeriodId = periodId;
         if (item.IsOpen == true)
            updateGeneralTime(item)
               .then(x => {
                  swal({
                     title: "עודכן בהצלחה!",
                     text: "היום התעדכן בהצלחה!",
                     icon: "success",
                  })
               })
               .catch(err => console.log(err));
         else
            deleteGeneralTime(item.Id)
               .then(x => {
                  swal({
                     title: "נמחק בהצלחה!",
                     text: "היום נמחק.",
                     icon: "success",
                  });
                  let vec = [...arr];
                  vec[index] = {name:item.name};
                  setArr([...vec]);
               })
               .catch(err => console.log(err));
      }
      else {
         item.PeriodId = periodId;
         console.log(item)
         addGeneralTimes(item)
            .then(x => {
               swal({
                  title: "התווסף בהצלחה!",
                  text: "היום התווסף בהצלחה!",
                  icon: "success",
               })
               const vec = [...arr];
               const o = { ...vec[index] };
               o.Id = x.data.Id;
               vec[index] = o;
               // vec[arr[index].DayInWeek-1]=arr[index];
               setArr(vec);
            })
            .catch(err => console.log(err));
      }
   }
   return (
      <form style={{ margintop: "2rem" }}>
         <h3>שעות פעילות האטרקציה:</h3>
         <p>שים ❤️ במידה ואינך מכניס זמן התחלה או סיום הוא מאותחל לזמנים הרשומים אוטומטית.</p>
         <p> *אם ברצונך להסיר את היום עדכן אותו שהוא סגור. </p>
         {arr && arr.map((item, index) => {
            return <div key={index}>
               <GeneralTimesDetails message={message} updateAndAdd={(item) => updateAndAdd(index, item)} change={(e) => change(e, index)}
                  type={type} remove={() => remove(index)}
                  item={item} />
            </div>
         })}

         {/* {type=="edit" && <Button variant="contained" size="medium" onClick={addTimes}> עדכן זמנים </Button>} */}

      </form>
   );
}
export default GeneralTimes;