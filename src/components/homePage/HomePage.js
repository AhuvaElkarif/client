import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { getRelevantAttractions } from "../../store/actions/AttractionActions"
import "./HomePage.css";

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [attractions, setAttractions] = useState(null);
    useEffect(() => {
        // getRelevantAttractions()
        //     .then(x => setAttractions(x.data))
        //     .catch(err => console.log(err))
    }, [])
    return (<>
        <img className="hpb" src="./homePageBack.jpg" />
        <h2>מה חם אצלנו כרגע</h2>
        {attractions != null ? <>{attractions.map(item => {
            return <div></div>

        })}</> : null}
        <Button variant="contained" color="secondary" onClick={() => { navigate("/attractionsList") }} startIcon={<CameraAltIcon />}>
               אטרקציות </Button> <br/> <br/>
            <Button variant="outlined" color="secondary" onClick={() => { navigate("/attractionsList") }}>
                לכל האטרקציות</Button> <br/> <br/>
        <Button variant="contained" color="secondary" onClick={() => { navigate("/attractionsList") }} startIcon={<CameraAltIcon />}>
            מסלולים וטיולים </Button> <br/> <br/>
        <Button variant="outlined" color="secondary" onClick={() => { navigate("/attractionsList") }}>
                לכל הטיולים </Button>
    </>);
}

export default HomePage;