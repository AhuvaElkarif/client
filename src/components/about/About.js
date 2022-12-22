import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAbout } from '../../store/actions/AboutAction';
import '../attractionsList/SingleAttraction.css'
import FormInput from '../formInput/FormInput';
import "./About.css";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AboutDetails from './AboutDetails';
import { SettingsSystemDaydream } from '@mui/icons-material';
import { Button } from '@material-ui/core';

const schema = yup.object({
    HeaderText: yup.string().required("שדה זה חובה"),
    ContentText: yup.string().required("שדה זה חובה").max(1000, 'לא ניתן להכניס יותר מ-1000 תווים'),
}).required();

function About() {
    const [arr, setArr] = useState([]);
    const [add, setAdd] = useState(false);
    const {type} = useParams();
    useEffect(() => {
        getAbout()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, []);
    return <div>
        <h1>אודות</h1>
        <br />
        <div className="about">
            <div className="container-about">
                {arr.map(item => {
                    return <div key={item.Id}>
                        <AboutDetails item={item} type={type} arr={arr} setArr={setArr}/>
                        <br /> <br />

                    </div>
                })}
                {type!="undefined"? <Button style={{ backgroundColor: "orange" }} variant="contained" onClick={()=>setAdd(true)}>
                    הוסף קטע</Button>:null}
                    {add && <AboutDetails type={"add"} item={null} />}
            </div>
            <div className="communicate">
            </div>
        </div>
    </div>
    {/* <p className="about" >
            {text}
            אודות האתר!!!!  <br/> <br/>
     באתר זה תוכלו למצוא מגוון אטרקציות מהנות ולחפש טיול מהנה למשפחה ולחברים.   <br/>
      האתר מציע מגוון רחב של אפשרויות להעביר את ימי החופש או סתם כשמתחשק לטייל.   <br/>
      תוכלו למצוא טיולים לכל עונות השנה מקיאקים ועד לחרמון.  <br/>
     האתר פותח במיוחד לבעלי המרץ שרוצים לנקות את הראש וליהנות מהחיים, ולמשפחות וחברים שרוצים לכייף  <br/>
     ולשכוח מהכול, בלי מאמץ ובלי חיפושים ובירורים מיותרים תוכלו לדפדף בין דפי האתר   <br/>
     ולקבל מידע על טיולים ואטרקציות עם תמונות מרהיבות וכל הפרטים.  <br/>
     אחרי שתכייפו תוכלו לתת חוות דעת על החוויה.   <br/>   <br/>
     
     טיול מהנה אל תשכחו מים חברים!!!
     
       </p> */}

}

export default About;
