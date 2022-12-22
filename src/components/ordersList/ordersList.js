import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import { getOrders } from "../../store/actions/OrderAction";
import SingleOrder from "./SingleOrder";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import SearchButton from "../attractionsList/SearchButton";
import WriteOpinion from "./WriteOpinion";
import "./OrdersList.css";
import "../opinion/Opinion.css";
import DateButton from "./DateButton";
import CheckboxList from "../sideNavBar/CheckboxList";
import FilterList from "./FilterList";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function OrdersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const date = new Date();
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [categoryArr, setCategoryArr] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [ordersArr, setOrdersArr] = useState(null);
    const { user, orders } = useSelector(state => {
        return {
            user: state.user,
            orders: state.ordersArr
        }
    }, shallowEqual);

    useEffect(() => {
console.log(orders)
    }, [])

    const dateToEpoch = (thedate) => {
        var time = thedate.getTime();
        return time - (time % 86400000);
    }

    return (<>
        <div>
            {/* // כפתור חיפוש */}
            {/* // אם הוא מנהל אתר או אטרקציה אז נוסף לו כפתור של סינון טווח תאריכים */}
            {user != null && user.Status == 2 || user.Status == 3 ? 
               <FilterList setCategoryArr={setCategoryArr} setSearchValue={setSearchValue} setValue1={setValue1} setValue2={setValue2}/>
                :<SearchButton search={(e) =>{e.preventDefault(); setSearchValue(e.target.value)}} /> }
            <br/> <br/> <br/>
            {orders.length > 0 ? orders.map(item => {
                if (item.Attraction.Name.includes(searchValue) &&
                    (!value1 || dateToEpoch(item.OrderDate) >= dateToEpoch(value1)) &&
                    (!value2 || dateToEpoch(item.OrderDate) <= dateToEpoch(value2)) &&
                    (!categoryArr || categoryArr.includes(item.Attraction.CategoryId)))
                    return <div key={item.Id} className="container">
                        <SingleOrder order={item} dateToEpoch={dateToEpoch} />
                    </div>
            }) : <p> אין לך הזמנות... </p>}
        </div>
    </>);
}

export default OrdersList;