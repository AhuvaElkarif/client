import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getAttractionDispatch, getAttractions, getAttractionsByUserId, getRelevantAttractions } from "../../store/actions/AttractionActions"
import "./HomePage.css";
import Grid from '@material-ui/core/Grid';
import { getCategories } from '../../store/actions/CategoryAction';
import { getUsers } from '../../store/actions/UserActions';
import { getWishList } from '../../store/actions/WishListAction';
import { getOrders, getOrdersByMangerId, getOrdersByUserId } from '../../store/actions/OrderAction';
import './HomePage.css';
import HotAttraction from './HotAttraction';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    x: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    myGrid: {
        height: '50vh'
    }
}));
function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [attractions, setAttractions] = useState(null);
    const [obj, setObj] = useState();
    const user = useSelector(state => state.user);
    useEffect(() => {
        // if (user == null || user.Status == 1 || user.Status == 3)
        dispatch(getAttractions());
        // else {
        //     dispatch(getAttractionsByUserId(user.Id));
        //     dispatch(getOrdersByMangerId(user.Id))
        // }
        if (user != null)
            if (user.Status == 3)
                dispatch(getOrders())
            else
                if (user.Status == 1)
                    dispatch(getOrdersByUserId(user.Id))
                else
                    dispatch(getOrdersByMangerId(user.Id))

        dispatch(getCategories());
        dispatch(getUsers());

    }, [])
    useEffect(() => {
        if (user != null)
            dispatch(getWishList(user.Id));
    }, [user]);

    return (<>
        <HotAttraction />
        {/* return   <Grid container spacing={2}>
            //     {index==0?<Grid item xs={8}> 
            //      style={{ width: '50vw', height: '60vh' }}>
            //         <img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`} width="100%" alt="" />
            //     </Grid>:
            //     <Grid item xs={4} >
            //         style={{ width: '20vw', height: '60vh' }}>
            //        {index==1? <img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`} width="100%" alt="" />
            //         :<img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`} width="100%" alt="" />
            //     }</Grid>}
            // </Grid> */}
        <Button variant="contained" color="primary" onClick={() => { navigate("/attractionsList") }} startIcon={<CameraAltIcon />}>
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