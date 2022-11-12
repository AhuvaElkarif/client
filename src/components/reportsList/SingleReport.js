import { useEffect } from "react";
import SingleOpinion from "../opinion/SingleOpinion";
import Poppers from "../popper/Popper";
import { Box } from "@material-ui/core";

const SingleReport = ({ item , change }) => {
   
    return (<div>
        <div className="opinion"> דיווח חוות דעת </div>
        <h4>המדווח: {item.UserName}</h4>
        <p>{item.CategoryName} <br /> {item.AttractionName}</p>
        <p> סיבת הדיווח:  {item.ReportName}</p>
        <SingleOpinion opinion={item.Opinion} type={2} />
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left: '4rem' }}>
            <Poppers func={() => { change(item, "remove") }} type={3} text="הסיר את חוות הדעת" content={"הסר"} />
            <Poppers func={() => { change(item, "cancel") }} type={3} text="בטל את הדיווח" content={"בטל דיווח"} />
        </Box>
    </div>
    )
}
export default SingleReport;