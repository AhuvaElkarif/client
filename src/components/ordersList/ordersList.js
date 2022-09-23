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
import Order from '../../models/Order';
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
    const [orders, setOrders] = useState([]);
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [categoryArr, setCategoryArr] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const { user, attractions } = useSelector(state => {
        return {
            user: state.user,
            attractions: state.attractionArr,
            // orders: state.ordersArr
        }
    }, shallowEqual);

    useEffect(() => {
        const arr = [new Order(1, 2, 500, new Date(2022, 7, 14), "טיולל"),
        new Order(11, 2, 500, new Date(), "שיט"),
        new Order(2, 2, 500, new Date(), "לונה פארק"),
        new Order(3, 2, 500, new Date(), "סופרלנד")];
        setOrders(arr);
        // dispatch(getOrders())
        // console.log(orders)
        // const orders = dispatch(getOrdersByUserId(user.id));
    }, [])
    const update = (item, type) => {
        const date = item.OrderDate;
        const attraction = { ...attractions.find(x => x.Id == item.AttractionId) };
        const possible = date.setDate(date.getDate() + attraction.DaysToCancel) < new Date();
        if (type == 1)
            if (possible)
                navigate("/order/" + false + "/" + 1 + "/" + item.AttractionId);
            else
                navigate("/message/" + item.AttractionId + "/" + 1 + "/" + false);
        else
            if (possible)
                navigate("/message/" + item.AttractionId + "/" + 0 + "/" + true);
            else
                navigate("/message/" + item.AttractionId + "/" + 0 + "/" + false);

    }
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
                if (item.Name.includes(searchValue) &&
                    (!value1 || dateToEpoch(item.OrderDate) >= dateToEpoch(value1)) &&
                    (!value2 || dateToEpoch(item.OrderDate) <= dateToEpoch(value2)) &&
                    (!categoryArr || categoryArr.includes(item.Attraction.CategoryId)))
                    return <div key={item.Id} className="contain">
                        <SingleOrder order={item} />
                        {user.Status == 1 ? <>
                            <WriteOpinion id={item.AttrctionId} />
                            {dateToEpoch(item.OrderDate) >= dateToEpoch(new Date()) ? <>
                                <Button variant="contained" className="btn" size="small" onClick={() => { update(item, 1) }}> עדכן הזמנה </Button>
                                <Button variant="contained" className="btn" size="small" onClick={() => { update(item, 0) }}> בטל הזמנה </Button>
                            </> : null}
                        </> : user.Status == 2 || user.Status == 3 ? <p>חוות דעת: </p> : null}
                    </div>
            }) : null}
        </div>
    </>);
}

export default OrdersList;