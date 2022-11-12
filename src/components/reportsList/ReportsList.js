import { getReports } from "../../store/actions/ReportAction";
import { useState, useEffect } from "react";
import { changeStatus } from "../../store/actions/OpinionsActions";
import AddKindReport from "./AddKindReport";
import SingleReport from "./SingleReport";

const ReportsList = () => {
    const [arr, setArr] = useState(null);
    
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
    
    return (
        <div className="product-list">
            {arr ? arr.map(item =>
                <div key={item.Id} className="container list">
                    <SingleReport item={item} change={change}/>
                </div>) : null
            }
          <AddKindReport/>
        </div >
    )
}
export default ReportsList;