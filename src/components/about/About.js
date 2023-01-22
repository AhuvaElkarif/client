import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAbout } from '../../store/actions/AboutAction';
import '../attractionsList/SingleAttraction.css'
import "./About.css";
import AboutDetails from './AboutDetails';
import "../wishList/WishList.css"
import { Button } from '@material-ui/core';
import Details from '../statistics/Details';

function About() {
    const [arr, setArr] = useState([]);
    const [add, setAdd] = useState(false);
    const { type } = useParams();
    useEffect(() => {
        getAbout()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, []);
    return <div className="bigDiv">
        <div className='wishesList '>
            <h1 style={{ color: "orange", marginRight: "1rem" }}>אודות</h1> <br/>
            <div className="about">
                <div className="container-about">
                    {arr.map(item => {
                        return <div key={item.Id}>
                            <AboutDetails item={item} type={type} arr={arr} setArr={setArr} /><br/><br/>
                        </div>
                    })}
                    {type ? <Button style={{ backgroundColor: "orange" }} variant="contained" onClick={() => setAdd(true)}>
                        הוסף קטע</Button> : null}
                    {add && <AboutDetails type={"add"} item={null} />}
                </div>
            </div>
        </div>
        <div className="bunner">
            <Details/> <br/> <br/>
            <img src="../../images/advertisment.png"/>
        </div>
    </div>
}

export default About;
