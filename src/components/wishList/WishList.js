import { useEffect, useState } from "react";
import SingleAttraction from '../attractionsList/SingleAttraction';
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getWishList, deleteProductFromWishList } from "../../store/actions/WishListAction";
import swal from 'sweetalert';
import "./WishList.css";
import WishCard from "../attractionsList/WishCard";

function WishList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const [wishes, setWishes] = useState([]);

    const { user, wishesArr } = useSelector(state => {
        return {
            user: state.user,
            wishesArr: state.wishesArr
        }
    }, shallowEqual);
    useEffect(() => {
        if (user != null)
            dispatch(getWishList(user.Id));
        setWishes(wishesArr);
    }, [])
    useEffect(() => {
        if (user == null) {
            const interval = setInterval(() => {
                setFlag(true);
                swal({
                    title: "שים לב!",
                    text: "היות והנך משתמש לא רשום הפריטים שברשימת המשאלות לא ישמרו",
                    icon: "warning",
                    button: "להרשמה",
                    OnClick: navigate("/register")
                  });
                // swal("שים לב!", "היות והנך משתמש לא רשום הפריטים שברשימת המשאלות לא ישמרו","warning") 
            }, 1000000);
        }
        setWishes(wishesArr);
    }, [wishesArr]);

    return (<>
        <h1>רשימת משאלות</h1>
        {wishes.length > 0 ? <div >{wishes.map((item, ind) => {
            return <div key={item.Id}> <WishCard item={item} ind={ind}/> <br/>
            </div>
        })}</div> : <><p>רשימת המשאלות שלך ריקה כרגע</p>
            <input type="button" value="לכל האטרקציות" className="btn" onClick={() => { navigate("/attractions") }} /></>}
    </>);
}

export default WishList;