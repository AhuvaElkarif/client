import StarIcon from '@mui/icons-material/Star';
import { getUserById } from "../../store/actions/UserActions";
import React, { useEffect, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "./Opinion.css";
import ReportOpinion from './ReportOpinion';

function SingleOpinion({ opinion, type }) {
    const [user, setUser] = useState(null);
    const [insertDate, setInsertDate] = useState(opinion.InsertDate);
    const starts = [1, 2, 3, 4, 5];

    useEffect(() => {
        getUserById(opinion.UserId)
            .then(x => setUser(x.data))
            .catch(err => console.log(err))
        calcDate();
    }, []);

    const calcDate = () => {
        const newDate = new Date();
        const insertDate2=new Date(insertDate);
        const d = (newDate - insertDate2) / (1000 * 60 * 60 * 24);
        let x;
        if (d < 30)
            x = "לפני " + Math.floor(d) + " ימים";
        else
            if (d < 365)
                x = "לפני " + Math.floor(d / 30) + " חודשים";
            else
                x = "לפני " + Math.floor(d / 365) + " שנים";
        setInsertDate(x);
    }

    return (<>
        {type!=2 ?<> <div className="opinion"><StarIcon /> חוות דעת </div>
        <ReportOpinion opinion={opinion}/></>:null}
        <p>{insertDate != opinion.InsertDate ? insertDate : null}</p>
        <h4>{user != null ? user.Name : null}</h4>
        {starts.map((x, ind) => {
            return <span key={ind}>
                {x <= opinion.Grading ? <StarIcon className="fullStar" /> : <StarBorderIcon />}
            </span>
        })}
        <p>{opinion.OpinionText}</p>
    </>);
}

export default SingleOpinion; 