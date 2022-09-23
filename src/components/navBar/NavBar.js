import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApprovalIcon from '@mui/icons-material/Approval';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIcon } from '@mui/material';
import './NavBar.css';
import { currentUser } from "../../store/actions/UserActions";
import { useState } from "react";
import Poppers from "../popper/Popper";
import './NavBar.css';
const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const arr = [
        { to: "homePage", name: "דף הבית", role: [0, 1, 2, 3] },
        { to: "regions", name: <SvgIcon component={PersonIcon} inheritViewBox></SvgIcon>, role: [0, 1] },
        // { to: "regions", name: <SvgIcon component={ApprovalIcon} inheritViewBox></SvgIcon>, role: [0, 1, 2, 3] },
        { to: "attractionsList", name: "אטרקציות", role: [0, 1, 2, 3] },
        // {
        //     login: {
        //         arr: [{ to: "register", name: "הרשמה", role: [0] },
        //         { to: "login", name: "התחברות", role: [0] },
        //         ]
        //     }
        // },
        { to: "about", name: "אודות", role: [0, 1] },
        { to: "wishList", name: "❤", role: [0, 1] },
        { to: "orderList", name: "הזמנות", role: [1, 2, 3] },
        // { to: "statistics", name: "סטטיסטיקות", role: [2, 3] },
        { to: "editAttraction", name: "הוספת אטרקציה", role: [2] },
        { to: "usersList", name: "מנהלי אטרקציות", role: [3] },
        {to:"reportsList", name: "דיווחי חוות דעת", role: [3] },
        {to:"categoriesList", name: "קטגוריות ממתינות לאישור", role: [3] },
        // { to: "register", name: "הוספת מנהל אטרקציה", role: [3] },
        // { to: "exit", name: "יציאה", role: [1, 2, 3] }
    ];
    let user = useSelector(state => state.user);
    if (user == null)
        user = { Status: 0 };

    return (<nav className="navBar">
        {arr.map(x => {
            return x.role.map((item, ind) => {
                return <div key={ind}>
                    {item == user.Status ?
                        <Link key={x.name} to={x.to} className="navBar-link">
                            {x.name}
                        </Link> : null}
                </div>
            })
        })}
        {user.Status != 0 ? <>
            <Poppers func={() => { dispatch(currentUser(null)); navigate('/attractionsList'); }}
                type={3}
                text="צאת?"
                content={"יציאה"} /> </> : null}
        {user.Status == 0 || user.Status == 1 ?
            <div onClick={() => { navigate("/login/" + 2) }} className='campaign'>
                <CampaignIcon />
                <p className="campaignP">פרסם אטרקציה</p>
            </div> : null}
    </nav>
    )
}
export default NavBar;
