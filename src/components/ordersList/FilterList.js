import { Button } from "@material-ui/core";
import { useState } from "react";
import '../sideNavBar/SideNavBar.css';
import DateButton from "./DateButton";
import SearchButton from "../attractionsList/SearchButton";
import CheckBoxList from "../sideNavBar/CheckboxList";
import './OrdersList.css'
const FilterList = ({setCategoryArr, setValue1,setValue2,setSearchValue  }) => {

    return (<div className="filter-orders">
        <DateButton setValue={setValue1} label={"מתאריך"} /> 
        <DateButton setValue={setValue2} label={"עד תאריך"}/>
        <CheckBoxList func={(arr) => { setCategoryArr(arr) }} type={1}flag={true} />
        <div className="filter-container"><SearchButton search={(e) => {  setSearchValue(e.target.value) }} /></div>

    </div>)
}
export default FilterList;