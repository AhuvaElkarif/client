import StarIcon from '@mui/icons-material/Star';
import { getUserById } from "../../store/actions/UserActions";
import React, { useEffect, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "./Opinion.css";
import ReportOpinion from './ReportOpinion';
import Poppers from '../popper/Popper';
import { Box } from '@material-ui/core';
import { changeStatus } from '../../store/actions/OpinionsActions';
import { deleteReport } from '../../store/actions/ReportAction';

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
        const insertDate2 = new Date(insertDate);
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
    // const change = () => {
    //     const array = opinions.filter(x => x.Id != item.OpinionId);
    //     setOpinions(array);
    //     console.log(item.target.value)
    //     changeStatus(item.OpinionId)
    //         .then(x => console.log(x.data))
    //         .catch(err => alert("אנו מתנצלים, ישנה תקלה זמנית בשרת."));
    // }
    // const deleteR = () => {
    //     const array = opinions.filter(x => x.Id != item.OpinionId);
    //     setOpinions(array);
    //     deleteReport(item.Id)
    //         .then(x => console.log(x.data))
    //         .catch(err => console.log(err));
    // }
    return (<>
        {type != 2 ? <> <div className="opinion"><StarIcon /> חוות דעת </div>
            <ReportOpinion opinion={opinion} /></> : null}
        <p>{insertDate != opinion.InsertDate ? insertDate : null}</p>
        <h4>{user != null ? user.Name : null}</h4>
        {starts.map((x, ind) => {
            return <span key={ind}>
                {x <= opinion.Grading ? <StarIcon className="fullStar" /> : <StarBorderIcon />}
            </span>
        })}
        <p>{opinion.OpinionText}</p>
        {/* {type == 2 ? <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left: '4rem' }}>
            <Poppers func={change} type={3} text="הסיר את חוות הדעת" content={"הסר"} />
            <Poppers func={deleteR} type={3} text="בטל את הדיווח" content={"בטל דיווח"} />
        </Box> : null} */}
    </>);
}

export default SingleOpinion; 