import CheckboxList from "./CheckboxList";
import FilterByAge from "./FilterByAge";
import MinimumDistanceSlider from "./Slider";
import './SideNavBar.css';

const SideNavBar = ({ filterArr, flag, setFlag }) => {
  return (<div className="filter-list">
    <CheckboxList func={filterArr} type={1} x={flag} setX={setFlag} />
    <CheckboxList func={filterArr} type={2} x={flag} setX={setFlag} />
    <CheckboxList func={filterArr} type={3} x={flag} setX={setFlag} />
    <FilterByAge filterAge={filterArr} x={flag} setX={setFlag}/>
    <MinimumDistanceSlider func={filterArr} x={flag} setX={setFlag} />
  </div>)
}
export default SideNavBar;