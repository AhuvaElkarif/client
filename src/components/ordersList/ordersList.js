import { useState, useEffect } from "react";
import SingleAttraction from '../attractionsList/SingleAttraction';
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import { getOrdersByUserId } from "../../store/actions/UserActions";
import SingleOrder from "./SingleOrder";
import { useDispatch } from "react-redux";
import Order from "../../models/Order";
import Button from '@mui/material/Button';
import "./OrdersList.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import "../opinion/Opinion.css";
import SearchButton from "../attractionsList/SearchButton";
import HoverRating from "./HoverRating";

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
    // const { user } = useSelector(state => ({
    //     user: state.user
    // }, shallowEqual));
    const [orders, setOrder] = useState([]);
    const { user } = useSelector(state => {
        return {
            user: state.user
        }
    }, shallowEqual);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [stars, setStars] = useState([0, 0, 0, 0, 0]);
    const [value, setValue] = useState('Controlled');
    const temp = stars;
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        const arr = [new Order(1, 2, 500, new Date(), "טיולל"),
        new Order(1, 2, 500, new Date(), "טיולל"),
        new Order(1, 2, 500, new Date(), "טיולל"),
        new Order(1, 2, 500, new Date(), "טיולל")];
        setOrder(arr);
        // const orders = dispatch(getOrdersByUserId(user.id));
    }, [])
    const update = (item, type) => {
        // how to check days to cancel
        const possible = true;
        if (type == 1)
            if (possible)
                navigate("/order/" + false + "/" + 1 + "/" + item.attrctionId);
            else
                navigate("/message/" + item.attrctionId + "/" + 1 + "/" + false);
        else
            if (possible)
                navigate("/message/" + item.attrctionId + "/" + 0 + "/" + true);
            else
                navigate("/message/" + item.attrctionId + "/" + 0 + "/" + false);

    }
    // עדכון מצב הכוכב דלוק/כבוי
   
    return (<>
        <div>
            {/* // כפתור חיפוש */}
            <SearchButton />
            {/* // אם הוא מנהל אתר או אטרקציה אז נוסף לו כפתור של סינון טווח תאריכים */}
            {user!=null && user.status == 2 || user.status == 3 ?
                <input placeholder="סנן לפי טווח תאריכים" /> : null}
            {/* // מערך של הזמנות */}
            {orders.map(item => {
                return <div key={item.id} className="contain">
                    <SingleOrder order={item} />
                  
                    {user.status == 1 ? <>
                        <Button variant="contained" size="small" className="btn" onClick={handleOpen}> כתוב חוות דעת</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style}>
                                    <h3>דירוג האטרקציה:  </h3> 
                                        <HoverRating/> <br/>
                                    <TextField
                                        id="outlined-textarea"
                                        label="חוות דעת"
                                        placeholder="כתוב חוות דעת"
                                        multiline
                                    /> <br /> <br />
                                    <Button variant="contained" size="large" onClick={handleClose}> הגש </Button>

                                </Box>
                            </Fade>
                        </Modal>
                        <Button variant="contained" size="small" className="btn" onClick={() => { update(item, 1) }}> עדכן הזמנה </Button>
                        <Button variant="contained" size="small" className="btn" onClick={() => { update(item, 0) }}> בטל הזמנה </Button>
                    </> : user.status == 2 || user.status == 3 ? <p>חוות דעת: </p> : null}
                </div>
            })}
        </div>
    </>);
}

export default OrdersList;