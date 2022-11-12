import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToWishList, deleteProductFromWishList } from "../../store/actions/WishListAction";
import { Button, SvgIcon } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Poppers from '../popper/Popper';
import { changeAttractionAvailable, changeAttractionStatus } from '../../store/actions/AttractionActions';
import AlertMessage from '../alert/AlertMessage';
import Alerts from '../alert/Alerts';

const Buttons = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const [status, setStatus] = useState("");
    const { user, attractions, wishList } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user,
            wishList: state.wishesArr
        }
    }, shallowEqual);
    const index = attractions.findIndex(x => x.Id === id);
    const item = { ...attractions.find(x => x.Id == id) };
    const [checked, setChecked] = useState(item.IsAvailable);
    useEffect(()=>{
        setStatus(item.Status ? "בטל" : "אשר")
    },[])
    useEffect(() => {
        if (flag) {
            const interval = setInterval(() => {
                setFlag(false);
            }, 3000);
        }
    }, [id, flag])

    const addProduct = () => {
        if (wishList.find(x => x.Id == item.Id))
            dispatch(deleteProductFromWishList(user, item.Id, index));
        else
            dispatch(addProductToWishList({ AttractionId: id, UserId: user != null ? user.Id : null }, user))
    }
    const changeAttraction = (type) => {
        if (type == 1)
            dispatch(changeAttractionAvailable(id));
        else {
            dispatch(changeAttractionStatus(id));
            const x= status== "אשר" ? "בטל" : "אשר";
            setStatus(x);
        }
        setFlag(true);
    }
    return (
        user == null || user.Status == 1 ?
            <Stack direction="row" spacing={3}>
                <IconButton aria-label="favorite" onClick={addProduct} style={{ color: "red" }}>
                    <SvgIcon component={wishList.find(x => x.Id == item.Id) ? FavoriteIcon : FavoriteBorderIcon} inheritViewBox />
                </IconButton>
                <IconButton aria-label='send' onClick={() => navigate("/order/" + false + "/" + 0 + "/" + item.Id)} >
                    <SendIcon size="large" />
                </IconButton>
            </Stack>
            : user.Status == 2 ?
                <>
                    <Button variant="contained" size="medium" onClick={() => { navigate("/editAttraction/" + item.Id) }}>  עדכון  </Button>
                    {!flag ?
                        <Poppers
                            type={2}
                            func={() => { changeAttraction(1) }}
                            text="שנות את הסטטוס"
                            checked={checked}
                            setChecked={setChecked} /> :
                        <AlertMessage
                            variant={'success'}
                            children={<Alerts message={"עודכן בהצלחה!"} />} />}
                </> :
                <>
                    {!flag ? <Poppers
                        type={3}
                        content={status}
                        func={() => { changeAttraction(2) }}
                        text={status} /> :
                        <AlertMessage
                            variant={'success'}
                            children={<Alerts message={item.Status ? "בוטל בהצלחה!" : "אושר בהצלחה!"} />}
                        />}
                </>
    )
}
export default Buttons;