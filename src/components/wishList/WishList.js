import { useEffect, useState } from "react";
import SingleAttraction from '../attractionsList/SingleAttraction';
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getWishList, deleteProductFromWishList } from "../../store/actions/WishListAction";
import "./WishList.css";

function WishList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        setWishes(wishesArr);
    }, [wishesArr]);
    return (<>
        <h1>רשימת משאלות</h1>
        {wishes.length > 0 ? <div className="product-list">{wishes.map((item, ind) => {
            return <div key={item.id} className="container"> <SingleAttraction product={item.AttracionId} />
                <input className="order" type="button" value="הזמן" onClick={() => navigate("/order/" + false + "/" + 0)} />
                <input className="show" type="button" value="הסר" onClick={() => dispatch(deleteProductFromWishList(user, ind, item))} />
            </div>
        })}</div> : <><p>רשימת המשאלות שלך ריקה כרגע</p>
            <input type="button" value="לכל האטרקציות" className="btn" onClick={() => { navigate("/attractions") }} /></>}

    </>);
}

export default WishList;