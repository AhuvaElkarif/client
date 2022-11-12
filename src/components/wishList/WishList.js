import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from "react-redux";
import swal from 'sweetalert';
import "./WishList.css";
import WishCard from "./WishCard";
import { Button } from "@material-ui/core";

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
    return (<>
        <h1>רשימת משאלות</h1>
        {wishes.length > 0 ? <div >{wishes.map((item, ind) => {
            return <div key={item.Id}> <WishCard item={item} ind={ind} /> <br />
            </div>
        })}</div> : <><p>רשימת המשאלות שלך ריקה כרגע</p>
            <Button variant="contained" size="medium" onClick={() => { navigate("/attractionsList") }}>  לכל האטרקציות  </Button>
        </>}
    </>);
}

export default WishList;