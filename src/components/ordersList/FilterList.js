import { Button } from "@material-ui/core";
import '../sideNavBar/SideNavBar.css';
import DateButton from "./DateButton";
import CheckBoxList from "../sideNavBar/CheckboxList";
import './OrdersList.css';

const FilterList = ({ setCategoryArr, v1, v2, setValue1, setValue2, filterFunc }) => {
    return (<div className="filter-orders">
        <DateButton setValue={setValue1} label={"מתאריך"} value={v1} />
        <DateButton setValue={setValue2} label={"עד תאריך"} value={v2} />
        <CheckBoxList func={(arr) => { setCategoryArr(arr) }} type={1} flag={true} />
        
        <div className="filter-container">
            <Button variant="contained"
                style={{ color: "white", backgroundColor: "orange", width: "15vw", fontSize: "large" }}
                onClick={filterFunc}>סנן</Button>
        </div>
    </div>)
}
export default FilterList;