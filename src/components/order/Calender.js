import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getDaysInMoth, GetTimesInDay } from "../../store/actions/OrderAction";
import ShowTimes from './ShowTimes';
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import "./CalenderCore.css";
import './Order.css';
import { CircularProgress } from "@material-ui/core";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import events from "./events";


export default function Calender({ id, amount, setStart, setDate, date }) {
  let firstDaty = 1;
  const [events, setEvents] = useState([]);
  const [times, setTimes] = useState(null);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    console.log(month + " " + year + " " + amount)
    getDaysInMoth(month, year, id, amount)
      .then(x => {
        const vec = x.data;
        vec.forEach(element => {
          const dateObj = new Date(element.start);
          var month = dateObj.getMonth() + 1; //months from 1-12
          month = month < 10 ? "0" + month : month;
          var day = dateObj.getDate();
          day = day < 10 ? "0" + day : day;
          var year = dateObj.getFullYear();
          element.start = year + "-" + month + "-" + day;
        });
        setEvents(vec);
      })
      .catch(err => console.log(err));
  }, []);
  
  const handleClick = (data) => {
    console.log(data.event.disabled)
    console.log(data.event.start)
    if (data.event.title == "יש כרטיסים") {
      const date = new Date(data.event.start);
      console.log(date);
      GetTimesInDay(date.getDate(), date.getMonth() + 1, date.getFullYear(), id, amount)
        .then(x => {
          console.log(x.data);
          setTimes(x.data);
          setDate(new Date(data.event.start));
        })
        .catch(err => console.log(err));
    }
    else
      setTimes(null);
  }
  console.log(events)
  return (<div style={{margin:"2.5rem"}}>
    <div className="App">
      {events.length == 0 ?
      <div className="circular-progress"> <CircularProgress /> </div>
      : <FullCalendar
        defaultView="dayGridMonth"
        firstDay={firstDaty}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={(data) => { console.log(data) }}
        buttonHints={() => { console.log("fa") }}
        customButtons={() => { console.log("dgh") }}
        eventClick={handleClick}
        eventChange={(data) => { console.log(data) }}
        datesRender={(a) => console.log(a, "yyyyyyyyyyyyyyyyyy")}
        locale="il"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        themeSystem="Simplex"
        // plugins={[dayGridPlugin]}
        events={events}
        allDayText={true}
      // initialEvents={[]}
      />}
    </div>

    {times && <div className="showTimes">
      <ShowTimes arr={times} setStart={setStart} date={date}/> </div>}

  </div>
  );
}
