import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimesByAttractionId } from "../../store/actions/GeneralTimes";

const ActivityTime = () => {
    const {id} = useParams();
    const attractions = useSelector(state => state.attractionArr);
    const product = { ...attractions.find(x => x.Id == id) };
    const [times, setTimes] = useState([]);
    useEffect(() => {
        getTimesByAttractionId(id)
        .then(x => setTimes(x.data))
        .catch(err => console.log(err));
        console.log(times);
    }, [])
    return (
        <div>
            <h1>שעות פעילות {product.Name}:</h1>
            <p>לתשומת לבכם! שעות הפעילות המדויקות מופיעות באתר זה - Discover Israel
                <br />
                תיתכן הקדמה בשעות הפתיחה או הסגירה, בהתאם לתנאי מזג האוויר – תקף לכל ימי הפעילות .
                <br />
                שעת הסגירה תוחלט בהתאם לשיקול דעת ההנהלה במקרים שונים.
                <br />
                פרטים ניתן לברר טרם הגעתכם בטלפון: {product.Phone}</p>
                 {times.map(item => <div> {item.Period.Season} </div>)}
        </div>
    )
}
export default ActivityTime;