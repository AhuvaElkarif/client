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
import { changeAttractionStatus } from '../../store/actions/AttractionActions';
import AlertMessage from '../alert/AlertMessage';
import Alerts from '../alert/Alerts';
import { Fragment } from 'react';

const Buttons = ({ id, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const [status, setStatus] = useState("");
    const [s, setS] = useState(false);
    const { user, attractions, wishList } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user,
            wishList: state.wishesArr
        }
    }, shallowEqual);

    const index = attractions.findIndex(x => x.Id == id);
    const item = { ...attractions.find(x => x.Id == id) };
    const [checked, setChecked] = useState(item.Status);
    useEffect(() => {
        setStatus(item.Status ? "בטל" : "אשר");
        setS(!item.Status);
    }, []);

    useEffect(() => {
        if (flag) {
            const interval = setInterval(() => {
                setFlag(false);
            }, 3000);
        }
    }, [id, flag]);

    const addProduct = () => {
        if (wishList.find(x => x.Id == item.Id))
            dispatch(deleteProductFromWishList(user, item.Id, index));
        else
            dispatch(addProductToWishList({ AttractionId: id, UserId: user  ? user.Id : null }, user))
    }

    const changeAttraction = (type) => {
        dispatch(changeAttractionStatus(id));
        if (type !== 1) {
            const x = status == "אשר" ? "בטל" : "אשר";
            setStatus(x);
            setS(!s);
        }
        setFlag(true);
    }
    return (
        type == 0 ?
            <Stack direction="row" spacing={3}>
                <IconButton aria-label="favorite" onClick={addProduct} style={{ color: "red" }}>
                    <SvgIcon component={wishList.find(x => x.Id == item.Id) ? FavoriteIcon : FavoriteBorderIcon} inheritViewBox />
                </IconButton>
                <IconButton aria-label='send' onClick={() => navigate("/order/" + item.Id)} >
                    <SendIcon size="large" />
                </IconButton>
            </Stack>
            : type == 1 ?
                <Fragment>
                    <Button variant="contained" color="primary" size="medium" onClick={() => { navigate("/editAttraction/" + item.Id) }}>  עדכון  </Button>
                    {!flag ?
                        <Poppers
                            type={2}
                            func={() => { changeAttraction(1) }}
                            text="שנות את הסטטוס"
                            checked={checked}
                            setChecked={setChecked} /> :
                        <AlertMessage
                            variant={'success'}
                            children={<Alerts message={"האטרציה עודכנה בהצלחה!"} />} />}
                </Fragment> :
                <Fragment>
                    {!flag ? <Poppers
                        type={3}
                        content={status}
                        func={() => { changeAttraction(2) }}
                        text={status} /> :
                        <AlertMessage
                            variant={'success'}
                            children={<Alerts message={s ? "בוטל בהצלחה!" : "אושר בהצלחה!"} />}
                        />}
                </Fragment>
    )
}
export default Buttons;