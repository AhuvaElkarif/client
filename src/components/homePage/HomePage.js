import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { getAttractions, getAttractionsByUserId, getRelevantAttractions } from "../../store/actions/AttractionActions"
import "./HomePage.css";
import { getCategories } from '../../store/actions/CategoryAction';
import { getUsers } from '../../store/actions/UserActions';
import { getWishList } from '../../store/actions/WishListAction';
import { getOrders, getOrdersByMangerId, getOrdersByUserId } from '../../store/actions/OrderAction';

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [attractions, setAttractions] = useState(null);
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (user == null || user.Status == 1 || user.Status == 3)
            dispatch(getAttractions());
        else{
            dispatch(getAttractionsByUserId(user.Id));
            dispatch(getOrdersByMangerId(user.Id))
        }
        if (user.Status == 3)
            dispatch(getOrders())
        else
            if (user.Status == 1)
                dispatch(getOrdersByUserId(user.Id))
        // getRelevantAttractions()
        //     .then(x => setAttractions(x.data))
        //     .catch(err => console.log(err))
        // dispatch(getUser)
        dispatch(getCategories());
        dispatch(getUsers());
    }, [])
    useEffect(() => {
        if (user != null)
            dispatch(getWishList(user.Id));
    }, [user])
    return (<>
        {/* <img className="hpb" src="./homePageBack.jpg" /> */}
        <h2>מה חם אצלנו כרגע</h2>
        {attractions ? <>{attractions.map(item => {
            return <div></div>

        })}</> : null}
        <Button variant="contained" color="secondary" onClick={() => { navigate("/attractionsList") }} startIcon={<CameraAltIcon />}>
            אטרקציות </Button> <br /> <br />
        <Button variant="outlined" color="secondary" onClick={() => { navigate("/attractionsList") }}>
            לכל האטרקציות</Button> <br /> <br />
        <Button variant="contained" color="secondary" onClick={() => { navigate("/attractionsList") }} startIcon={<CameraAltIcon />}>
            מסלולים וטיולים </Button> <br /> <br />
        <Button variant="outlined" color="secondary" onClick={() => { navigate("/attractionsList") }}>
            לכל הטיולים </Button>
    </>);
}

export default HomePage;