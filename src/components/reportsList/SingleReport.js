import { useEffect } from "react";
import SingleOpinion from "../opinion/SingleOpinion";
import Poppers from "../popper/Popper";
import { Box } from "@material-ui/core";
import '../opinion/Opinion.css';
const SingleReport = ({ item , change }) => {
   
    return (<div>
        <div className="opinion"> דיווח חוות דעת </div>
        <h4>המדווח: {item.UserName}</h4>
        <p> קטגוריה: {item.CategoryName} <br /> שם האטרקציה: {item.AttractionName}</p>
        <p> סיבת הדיווח:  {item.ReportName}</p> 
        <hr/> <br/> 
        <h4>חוות הדעת:</h4>
        <SingleOpinion opinion={item.Opinion} type={2} />
        <div className="opinionButtons">
        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left: '4rem', margin:'1rem' }}> */}
            <span><Poppers func={() => { change(item, "remove") }} type={3} text="הסיר את חוות הדעת" content={"הסר"} /> </span>
            <span><Poppers func={() => { change(item, "cancel") }} type={3} text="בטל את הדיווח" content={"בטל דיווח"} /> </span>
        {/* </Box> */}
        </div>
    </div>
    )
}
export default SingleReport;