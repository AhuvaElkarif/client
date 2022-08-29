import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
// import 'react-daypicker/src/DayPicker.css';
const SelectDate = () => {
  const onChange = (date) => {
    console.log(date.toString());
  };

  return (
    <DayPicker
    // active={moment().add(1, 'day')}
    onDayClick={(day) => this.setState({ day })}
  />
  );
}
export default SelectDate;