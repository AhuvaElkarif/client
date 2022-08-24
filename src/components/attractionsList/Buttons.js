import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToWishList } from "../../store/actions/WishListAction";
import { Button, SvgIcon } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import swal from 'sweetalert';

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
        if (wishList.find(x => x.Id == item.Id))
            swal("מוצר זה כבר קיים ברשימת המשאלות שלך")
        else
            dispatch(addProductToWishList({ AttractionId: id, UserId: user != null ? user.Id : null }, user))
    }

    return (
        user == null || user.Status == 1 ? 
        <Stack direction="row" spacing={3}>
            <IconButton aria-label="favorite"  onClick={addProduct} style={{ color: "red" }}>
            <SvgIcon component={wishList.find(x => x.Id == item.Id)?FavoriteIcon:FavoriteBorderIcon} inheritViewBox/>
            </IconButton>
            <IconButton aria-label='send' onClick={() => navigate("/order/" + false + "/" + 0 + "/" + item.Id)} >
            <SendIcon  size="large" />    
            </IconButton>
            {/* {flag && <p>מוצר זה כבר קיים ברשימת המשאלות שלך</p>} */}
           
            </Stack>
        : user.Status == 2 ?
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