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

    }, [])

    const dateToEpoch = (thedate) => {
        var time = thedate.getTime();
        return time - (time % 86400000);
    }

    return (<>
        <div>
            {/* // כפתור חיפוש */}
            <SearchButton search={({ target }) => setSearchValue(target.value)} />
            {/* // אם הוא מנהל אתר או אטרקציה אז נוסף לו כפתור של סינון טווח תאריכים */}
            {user != null && user.Status == 2 || user.Status == 3 ? <>
                <DateButton setValue={setValue1} label={"מתאריך"} /> -
                <DateButton setValue={setValue2} label={"עד תאריך"} />
                <CheckboxList func={(arr) => { setCategoryArr(arr) }} type={1} />
            </>
                : null}
            {orders.length > 0 ? orders.map(item => {
                if (item.Attraction.Name.includes(searchValue) &&
                    (!value1 || dateToEpoch(item.OrderDate) >= dateToEpoch(value1)) &&
                    (!value2 || dateToEpoch(item.OrderDate) <= dateToEpoch(value2)) &&
                    (!categoryArr || categoryArr.includes(item.Attraction.CategoryId)))
                    return <div key={item.Id} className="container">
                        <SingleOrder order={item} dateToEpoch={dateToEpoch} />
                       
                        
                    </div>
            }) : null}
        </div>
    </>);
}

export default OrdersList;