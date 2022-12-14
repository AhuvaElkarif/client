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


export default function Calender({ id, amount }) {
  let firstDaty = 1;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    console.log(month+" "+year+" "+amount)
    getDaysInMoth(month, year, id, amount)
      .then(x => {
        console.log(x.data)
        const vec = x.data;
        vec.forEach(element => {
          const dateObj = new Date(element.start);
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          month = month<10? "0"+month:month;
          var day = dateObj.getUTCDate();
          day = day<10? "0"+day:day;
          var year = dateObj.getUTCFullYear();
          element.start = year + "-" + month + "-" + day;
      });
        setEvents(vec)
      })
      .catch(err => console.log(err));
  }, []);

 console.log(events)
  return (
    <div className="App">
    {events.length>0 && <FullCalendar
        defaultView="dayGridMonth"
        firstDay={firstDaty}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={(data) => { console.log(data) }}
        buttonHints={() => { console.log("fa") }}
        customButtons={() => { console.log("dgh") }}
        eventClick={(data)=>console.log(data)}
        eventChange={(data) => { console.log(data) }}
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
      />}
    </div>
  );
}
