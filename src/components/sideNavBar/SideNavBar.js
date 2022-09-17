import { Button } from "@material-ui/core";
import { useState } from "react";
import CheckboxList from "./CheckboxList";
import FilterByAge from "./FilterByAge";
import MinimumDistanceSlider from "./Slider";

const SideNavBar = ({ filterArr, zero, count }) => {
  const [flag, setFlag] = useState(false);

  return (<div>
    {count > 0 && <Button size="large" variant="contained" onClick={() => { setFlag(true); zero(); }}> נקה הכל ({count}) </Button>}
    <br/> <br/><br/> <br/>
    <MinimumDistanceSlider func={filterArr} x={flag} setX={setFlag} />
    <br/> <br/> <br/> <br/>
    <CheckboxList func={filterArr} type={1} x={flag} setX={setFlag} />
    <CheckboxList func={filterArr} type={2} x={flag} setX={setFlag} />
    <CheckboxList func={filterArr} type={3} x={flag} setX={setFlag} />
    <FilterByAge filterAge={filterArr} x={flag} setX={setFlag}/>

  </div>)
}
export default SideNavBar;