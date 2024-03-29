import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTimesByAttractionId } from "../../store/actions/GeneralTimes";
import ActivityTimeDetails from './ActivityTimeDetails';

const ActivityTime = ({ id }) => {
    const attractions = useSelector(state => state.attractionArr);
    const product = { ...attractions.find(x => x.Id == id) };
    const [times, setTimes] = useState([]);
    useEffect(() => {
        getTimesByAttractionId(id)
            .then(x => setTimes(x.data))
            .catch(err => console.log(err));
    }, [id]);

    return (<div>
        <h2>שעות פעילות {product.Name}:</h2> <br/>
        {times.length > 0 ?<Fragment><p>לתשומת לבכם! שעות הפעילות המדויקות מופיעות באתר זה - Discover Israel
            <br />
            תיתכן הקדמה בשעות הפתיחה או הסגירה, בהתאם לתנאי מזג האוויר – תקף לכל ימי הפעילות .
            <br />
            שעת הסגירה תוחלט בהתאם לשיקול דעת ההנהלה במקרים שונים.
            <br />
            פרטים ניתן לברר טרם הגעתכם בטלפון: {product.Phone}</p> <br />
        {times.map(item => {
            if (item.times.length > 0)
                return <div key={item.Id}>
                    <h4 style={{ color: item.Color }}>
                        {item.IsOpen ? "פתוח" : "סגור"} {new Date(item.TillDate).toLocaleDateString()} - {new Date(item.FromDate).toLocaleDateString()}
                    </h4>
                    <ActivityTimeDetails times={item.times} /> <br />
                </div>
        })} </Fragment> : <p> אין מספיק נתונים בררו במספר הטלפון: {product.Phone} </p>}
    </div>
    )
}
export default ActivityTime;