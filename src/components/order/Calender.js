import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getDaysInMoth } from "../../store/actions/OrderAction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import "./CalenderCore.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import events from "./events";


export default function Calender({id}) {
  let firstDaty = 1;
  const [events,setEvents] = useState([]);

  useEffect(()=>{
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    getDaysInMoth(month,year,id)
    .then(x => setEvents(x.data))
    .catch(err => console.log(err));
 },[])
 console.log(events);

 function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();
  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}
  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        firstDay={firstDaty}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={(data)=>{console.log(data)}}
        buttonHints={()=>{console.log("fa")}}
        customButtons={()=>{console.log("dgh")}}
        // eventClick={(data)=>console.log(data)}
        eventChange={(data)=>{console.log(data)}}
        locale="il"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        themeSystem="Simplex"
        // plugins={[dayGridPlugin]}
        events={events}
        // initialEvents={[]}
      />
    </div>
  );
}
