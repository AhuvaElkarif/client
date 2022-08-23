import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToWishList } from "../../store/actions/WishListAction";

const Buttons = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const { user, attractions, wishList } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user,
            wishList: state.wishesArr
        }
    }, shallowEqual);
    const item = { ...attractions.find(x => x.Id == id) };
    const addProduct = () => {
        console.log(wishList)
        if (wishList.find(x => x.AttractionId == item.Id))
            setFlag(true);
        else
            dispatch(addProductToWishList({ AttractionId: id, UserId: user != null ? user.Id : null }, user))
    }

    return (user == null || user.Status == 1 ? <>
        <IconButton aria-label="add to favorites" onClick={addProduct}>
            <FavoriteIcon style={{ color: "red" }} />
        </IconButton>
        <input className="order" type="button" value="הזמן" onClick={() => navigate("/order/" + false + "/" + 0 + "/" + item.Id)} />
        {flag && <p>מוצר זה כבר קיים ברשימת המשאלות שלך</p>}
    </> : user.Status == 2 ?
        <>
            <input className="update" type="button" value="עדכון" onClick={() => { navigate("/editAttraction/" + item.Id) }} />
            <IconButton aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" /> </IconButton>
        </> :
        <>
            <input className="agree" type="button" value="אשר" />
            <input className="cancel" type="button" value="בטל" /></>
    )
}
export default Buttons;