// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const MyCalender = () => {
//   const [value, onChange] = useState(new Date());

//   return (
//     <div>
//       <Calendar onChange={onChange} value={value} />
//     </div>
//   );
// }
// export default MyCalender;
// import 'react-daypicker/lib/DayPicker.css';
// import DayPicker from 'react-daypicker';
// // import 'react-daypicker/src/DayPicker.scss';
// const MyCalender = () => {
//   const onChange = (date) => {
//     console.log(date.toString());
//   };

//   return (
//     <DayPicker
//     active={moment().add(1, 'day')}
//     onDayClick={(day) => this.setState({ day })}
//   />
//   );
// }
// export default MyCalender;