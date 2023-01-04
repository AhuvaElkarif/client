import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import SingleOrder from "./SingleOrder";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import SearchButton from "../attractionsList/SearchButton";
import "./OrdersList.css";
import "../opinion/Opinion.css";
import FilterList from "./FilterList";
import { indigo } from "@material-ui/core/colors";
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
    const {type} = useParams();
    const navigate = useNavigate();
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [categoryArr, setCategoryArr] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [ordersArr, setOrdersArr] = useState([]);
    const { user, orders } = useSelector(state => {
        return {
            user: state.user,
            orders: state.ordersArr
        }
    }, shallowEqual);

    useEffect(() => {
        let vec = [...orders];
        if(type==0)
             vec = orders.filter(x => x.UserId == user.Id);
        else
        if(type==1)
             vec = orders.filter(x => x.Attraction.ManagerId == user.Id);
        setOrdersArr(vec);
        const maxDate = new Date(Math.max(
            ...orders.map(element => {
                return new Date(element.OrderDate);
            }),
        ),);
        const minDate = new Date(Math.min(
            ...orders.map(element => {
                return new Date(element.OrderDate);
            }),
        ),);
        setValue1(minDate);
        setValue2(maxDate);
    }, [])
    const dateToEpoch = (thedate) => {
        var time = thedate.getTime();
        return time - (time % 86400000);
    }

    const filterFunc = () => {
        let vec = [...orders];
        vec = vec.filter(x => new Date(x.OrderDate) <= value2 && new Date(x.OrderDate) >= value1 ||
                          new Date(x.OrderDate).toDateString() == value1.toDateString() || new Date(x.OrderDate).toDateString() == value1.toDateString())
        if (categoryArr)
            vec = vec.filter(x => categoryArr.includes(x.Attraction.CategoryId));
        setOrdersArr(vec);
    }
    return (<Fragment>
            <div className="searchBtn"><SearchButton setSearchValue={setSearchValue} search={({target}) => { setSearchValue(target.value) }} /> </div>
            {value1!=null && value2!=null && user != null &&
                <FilterList v1={value1} v2={value2} filterFunc={filterFunc} setCategoryArr={setCategoryArr} setValue1={setValue1} setValue2={setValue2} />}
            <br /> <br /> <br />
            <div style={{position:"relative", right:"20rem"}}>
            {ordersArr.length > 0 ? ordersArr.map(item => {
                if (item.Attraction.Name.includes(searchValue))// &&
                    //     (!value1 || new Date(item.OrderDate) >= value1) &&
                    //     (!value2 || new Date(item.OrderDate) <= value2) &&
                    //     (!categoryArr || categoryArr.includes(item.Attraction.CategoryId)))
                    return <div key={item.Id} className="container">
                        <SingleOrder order={item} dateToEpoch={dateToEpoch} type={type}/>
                    </div>
            }) : orders.length == 0 && type!=1? <div className="emptyMessage"> <br /><p> רשימת ההזמנות שלך ריקה  <br /> <br />
                להזמנת אטרקציות היכנסו לאטרקציות לחצו על כפתור ההזמנה והאטרקציה תתווסף לרשימת ההזמנות:). </p> <br /> <br />
                <Button variant="contained" size="medium" style={{ backgroundColor: "orange" }} onClick={() => { navigate("/attractionsList/" + 0) }}>  לכל האטרקציות  </Button>
            </div>:null}
            </div>
    </Fragment>);
}

export default OrdersList;