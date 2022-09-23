import { useEffect } from "react";
import { useState } from "react";
import { getReports } from "../../store/actions/ReportAction";
import SingleReport from "./SingleReport";

const ReportsList = () => {
    const [arr, setArr] = useState(null);
    useEffect(() => {
        getReports()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="product-list">
            {arr ? arr.map(item =>
                <div key={item.Id} className="container list">
             <SingleReport item={item}/>
            </div> ):null}
        </div>
    )
}
export default ReportsList;