import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {  getAttractions } from "../../store/actions/AttractionActions"
import { getCategories } from '../../store/actions/CategoryAction';
import { getUsers } from '../../store/actions/UserActions';
import { getWishList } from '../../store/actions/WishListAction';
import { getOrders } from '../../store/actions/OrderAction';
import HotAttraction from './HotAttraction';
import AttractionsByArea from './AttractionsByArea';
import DisplayAttractions from './DisplayAttractions';
import "./HomePage.css";

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
    const [recommendAttractions, setRecommendAttractions] = useState([]);
    const [newAttractions, setNewAttractions] = useState([]);
    const [obj, setObj] = useState();
    const {user, attractions} = useSelector(state => {
        return{
            user: state.user,
            attractions: state.attractionArr
        }
    },shallowEqual);
    useEffect(() => {
        dispatch(getAttractions());
        if (user != null)
            dispatch(getOrders())
        dispatch(getCategories());
        dispatch(getUsers());
    }, [])
    useEffect(()=>{
        const vec = [...attractions.filter(x => !x.Seasons.includes(obj))];
        vec.sort((a, b) => b.CountAvgGrading - a.CountAvgGrading);
        setRecommendAttractions(vec);

        const vec2 = [...attractions];
        vec2.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
        setNewAttractions(vec2)
    },[attractions])
    useEffect(() => {
        if (user != null)
            dispatch(getWishList(user.Id));
        const month = new Date().getMonth();
        if (month >= 1 && month <= 3)
            setObj(2);
        else
            if (month >= 4 && month <= 6)
                setObj(3);
            else
                if (month >= 7 && month <= 9)
                    setObj(4);

                else
                    setObj(1);
    }, [user]);

    return (<>
        <HotAttraction obj={obj} />
        <br /> <br />
        {newAttractions.length > 0 && <DisplayAttractions arr={newAttractions} name={"חדשות"} />}
        {recommendAttractions.length > 0 && <DisplayAttractions arr={recommendAttractions} name={"מומלצות"} />}
        <AttractionsByArea obj={obj} />

      


    </>);
}

export default HomePage;