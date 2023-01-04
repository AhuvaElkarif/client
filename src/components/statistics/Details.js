import { useSelector } from "react-redux";
import './Statistics.css';
const Details = () => {
    const statistics = useSelector(state => state.statisticts);
    return  <div className="statisticsDiv"> <br/>
         <h2 > מה הנתונים אומרים עלינו?</h2>
            <h3>אצלנו באתר יש:</h3> <br/>
            <div className="container-s"><p className="container-sp">{statistics.CountUsers} משתמשים</p></div>
            <div className="container-s"><p className="container-sp">{statistics.CountAttractions} אטרקציות</p></div>
            <div className="container-s"><p className="container-sp">{statistics.CountOrders} הזמנות</p></div>
        <br/> </div>
}
export default Details;