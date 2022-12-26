import { Button } from "@material-ui/core";
import { useState } from "react";
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
{/* <Button  variant="contained" className="filter-container" onClick={()=>{setDisplay(true)}}>סנן</Button> */}
  </div>)
}
export default SideNavBar;