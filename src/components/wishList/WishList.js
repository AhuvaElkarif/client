import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import WishCard from "./WishCard";
import { Button } from "@material-ui/core";
import CommonSeason from "../statistics/CommonSeason";
import Statistics from "../statistics/Statistics";
import "./WishList.css";

function WishList() {
    const navigate = useNavigate();
    const [wishes, setWishes] = useState([]);

    const { user, wishesArr } = useSelector(state => {
        return {
            user: state.user,
            wishesArr: state.wishesArr
        }
    }, shallowEqual);

    useEffect(() => {
        setWishes(wishesArr);
    }, [wishesArr]);

    return (<div className="bigDiv">
        <div className="wishesList">
            <h1>אטרקציות שאהבתי ({wishes.length})</h1>
            <br />
            {!user && <div> <p> שים ❤️ : היות והנך משתמש לא רשום הפריטים שברשימה זו אינם ישמרו. </p> <br /></div>}
            {wishes.length > 0 ? <div >{wishes.map((item, ind) => {
                return <div key={item.Id}> <WishCard item={item} ind={ind} /> <br />
                </div>
            })}</div> : <div className="emptyMessage"> <br /><p> רשימת המשאלות שלך ריקה  <br /> <br />
                להוספת אטרקציות היכנסו לאטרקציות ולחצו על ה-❤️  והאטרקציה תתווסף לרשימת המשאלות. </p> <br /> <br />
                <Button variant="contained" size="medium" style={{ backgroundColor: "orange" }} onClick={() => { navigate("/attractionsList/" + 0) }}>  לכל האטרקציות  </Button>
            </div>}
        </div>
        <div className="bunner">
            <h3>מה היו האטרקציות הפופולאריות בשנה האחרונה?</h3>
            <Statistics /> <br /><br />
            <h3>אז מהו האיזור המבוקש ביותר בארץ לאטרקציות?</h3>
            <CommonSeason />
        </div>
    </div>);
}

export default WishList;