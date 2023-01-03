import { getReports } from "../../store/actions/ReportAction";
import { useState, useEffect } from "react";
import { changeStatus } from "../../store/actions/OpinionsActions";
import AddKindReport from "./AddKindReport";
import SingleReport from "./SingleReport";
import { Fragment } from "react";
import Category from "../category/Category";
import "./ReportsList.css"
const ReportsList = () => {
    const [arr, setArr] = useState([]);
    
    useEffect(() => {
        getReports()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, []);
    const change = (item, operation) => {
        const array = arr.filter(x => x.Id != item.Id);
        setArr(array);
        console.log(item)
        changeStatus(item.Id, operation)
            .then(x => console.log(x.data))
            .catch(err => alert("אנו מתנצלים, ישנה תקלה זמנית בשרת."));
    }
    
    return <Fragment>
        <Category/> <br/><br/>
          <h2 className="h2"> דיווחי חוות דעת </h2>
        <div className="product-list" style={{marginTop:"-3rem"}}>
            {arr.length>0 ? arr.map(item =>
                <div key={item.Id} className="container-opinion">
                    <SingleReport item={item} change={change}/>
                </div>) : <h2>רשימת הדיווחים ריקה כעת.</h2>
            }
        </div >
        <AddKindReport/> 
    </Fragment>
}
export default ReportsList;