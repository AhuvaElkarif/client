import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import { getOrdersByUserId } from "../../store/actions/UserActions";
import SingleOrder from "./SingleOrder";
import { useDispatch } from "react-redux";
import Order from "../../models/Order";
import Button from '@mui/material/Button';
import SearchButton from "../attractionsList/SearchButton";
import WriteOpinion from "./WriteOpinion";
import "./OrdersList.css";
import "../opinion/Opinion.css";
function OrdersList() {
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orders, setOrder] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { user, attractions } = useSelector(state => {
        return {
            user: state.user,
            attractions: state.attractionArr
        }
    }, shallowEqual);

    useEffect(() => {
        const arr = [new Order(1, 2, 500, new Date(2022,7,14), "טיולל"),
        new Order(11, 2, 500, new Date(), "שיט"),
        new Order(2, 2, 500, new Date(), "לונה פארק"),
        new Order(3, 2, 500, new Date(), "סופרלנד")];
        setOrder(arr);
        // getOrdersByUserId(user.id)
        // .then(x => setOrders(x.data))
        // .catch(err => console.log(err));
        // const orders = dispatch(getOrdersByUserId(user.id));
    }, [])
    const update = (item, type) => {
        const date= item.orderDate;
        const attraction = { ...attractions.find(x => x.Id == item.attractionId) };
        const possible = date.setDate(date.getDate()+attraction.DaysToCancel) < new Date();
        if (type == 1)
            if (possible)
                navigate("/order/" + false + "/" + 1 + "/" + item.attractionId);
            else
                navigate("/message/" + item.attractionId + "/" + 1 + "/" + false);
        else
            if (possible)
                navigate("/message/" + item.attractionId + "/" + 0 + "/" + true);
            else
                navigate("/message/" + item.attractionId + "/" + 0 + "/" + false);

    }

    return (<>
        <div>
            {/* // כפתור חיפוש */}
            <SearchButton search={({ target }) => setSearchValue(target.value)} />
            {/* // אם הוא מנהל אתר או אטרקציה אז נוסף לו כפתור של סינון טווח תאריכים */}
            {user != null && user.status == 2 || user.status == 3 ?
                <input placeholder="סנן לפי טווח תאריכים" /> : null}
            {orders.map(item => {
                if (item.name.includes(searchValue))
                    return <div key={item.id} className="contain">
                        <SingleOrder order={item} />
                        {user.Status == 1 ? <>
                            <WriteOpinion id={item.attrctionId} />
                            <Button variant="contained" className="btn" size="small" onClick={() => { update(item, 1) }}> עדכן הזמנה </Button>
                            <Button variant="contained" className="btn" size="small" onClick={() => { update(item, 0) }}> בטל הזמנה </Button>
                        </> : user.Status == 2 || user.Status == 3 ? <p>חוות דעת: </p> : null}
                    </div>
            })}
        </div>
    </>);
}

export default OrdersList;