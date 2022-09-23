import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { getAttractions, getAttractionsByUserId, getRelevantAttractions } from "../../store/actions/AttractionActions"
import "./HomePage.css";
import { getCategories } from '../../store/actions/CategoryAction';

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [attractions, setAttractions] = useState(null);
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (user == null || user.Status == 1 || user.Status == 3)
            dispatch(getAttractions());
        else
            dispatch(getAttractionsByUserId(user.Id));
        // getRelevantAttractions()
        //     .then(x => setAttractions(x.data))
        //     .catch(err => console.log(err))
        dispatch(getCategories());
    }, [])
    return (<>
        <img className="hpb" src="./homePageBack.jpg" />
        <h2>מה חם אצלנו כרגע</h2>
        {attractions != null ? <>{attractions.map(item => {
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