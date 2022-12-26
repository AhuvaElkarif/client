import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import swal from 'sweetalert';
import "./WishList.css";
import WishCard from "./WishCard";
import { Button } from "@material-ui/core";
import ButtomNavigation from "../bottomNavigation/ButtomNavigation";
import Regions from "../regions/Regions";

function WishList() {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [wishes, setWishes] = useState([]);

    const { user, wishesArr } = useSelector(state => {
        return {
            user: state.user,
            wishesArr: state.wishesArr
        }
    }, shallowEqual);
    useEffect(() => {
        setWishes(wishesArr);
    }, [])
    useEffect(() => {
        if (user == null) {
            const interval = setInterval(() => {
                setFlag(true);
                swal({
                    title: "שים לב!",
                    text: "היות והנך משתמש לא רשום הפריטים שברשימת המשאלות לא ישמרו",
                    icon: "warning",
                    buttons: {
                        cancel: "הזכר לי מאוחר יותר",
                        catch: "להרשמה"
                    },
                })
                    .then((value) => {
                        switch (value) {
                            case "catch":
                                func();
                                break;

                            case "cancel":
                                swal.close();
                        }
                    })
            }, 100000);
        }
        setWishes(wishesArr);
    }, [wishesArr]);
    const func = () => {
        navigate("/register/" + 1);
    }
    return (<div className="wishesList">
        <h1>אטרקציות שאהבתי ({wishes.length})</h1> <br/>
        {wishes.length > 0 ? <div >{wishes.map((item, ind) => {
            return <div key={item.Id}> <WishCard item={item} ind={ind} /> <br />
            </div>
        })}</div> : <div className="emptyMessage"> <br/><p> רשימת המשאלות שלך ריקה  <br/> <br/>
                   להוספת אטרקציות היכנסו לאטרקציות ולחצו על ה-❤️  והאטרקציה תתווסף לרשימת המשאלות. </p> <br/> <br/>
            <Button variant="contained" size="medium" style={{backgroundColor:"orange"}} onClick={() => { navigate("/attractionsList/"+0) }}>  לכל האטרקציות  </Button>
        </div>}
    </div>);
}

export default WishList;