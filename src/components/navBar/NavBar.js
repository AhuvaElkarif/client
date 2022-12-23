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
        // { to: "regions", name: <SvgIcon component={ApprovalIcon} inheritViewBox></SvgIcon>, role: [0, 1, 2, 3] },
        { to: "attractionsList/"+0, name: "אטרקציות", role: [0, 1,2] },
        { to: "attractionsList/"+1, name: "האטרקציות שלי", role: [2] },
        { to: "attractionsList/"+2, name: "אטרקציות", role: [ 3] },

        // { to: "regions", name: <SvgIcon component={PersonIcon} inheritViewBox></SvgIcon>, role: [0, 1, 2, 3] },

        // {
        //     login: {
        //         arr: [ { to: "orderList", name: "הזמנות", role: [1, 2, 3] } ,
        //         { to: "login", name: "התחברות", role: [0] },
        //         ]
        //     }
        // },
        { to: "register/"+0, name: "הרשמה", role: [0] },
                 { to: "login/"+0, name: "התחברות", role: [0] },
        { to: "about/"+undefined, name: "אודות", role: [0, 1] },
        { to: "wishList", name: "❤", role: [0, 1] },
        { to: "orderList", name: "הזמנות", role: [1, 2, 3] },
        // { to: "statistics", name: "סטטיסטיקות", role: [2, 3] },
        { to: "editAttraction", name: "הוספת אטרקציה", role: [2] },
        { to: "usersList", name: "מנהלי אטרקציות", role: [3] },
        {to:"reportsList", name: "דיווחי חוות דעת", role: [3] },
        { to: "about/"+"edit", name: "עריכת אודות", role: [3] },
        {to:"categoriesList", name: "קטגוריות ממתינות לאישור", role: [3] },
        // { to: "register", name: "הוספת מנהל אטרקציה", role: [3] },
        // { to: "exit", name: "יציאה", role: [1, 2, 3] }
    ];
    let user = useSelector(state => state.user);
    if (user == null)
        user = { Status: 0 };

    return (<nav className="navBar">
        {arr.map(x => {
            return x.role.map((item, ind) => { if(item == user.Status) return <div key={ind}>
                        <Link key={x.name} to={x.to} className="navBar-link">
                            {x.name}
                        </Link></div>})
        })}
        {user.Status != 0 ? <div className="btnExit">
            <Poppers func={() => { dispatch(currentUser(null)); navigate('/attractionsList/'+0); }}
                type={3}
                text="צאת"
                content={"יציאה"} /> </div> : null}
        {user.Status == 0 || user.Status == 1 ?
            <div onClick={() => { navigate("/login/" + 2) }} className='campaign'>
                <CampaignIcon />
                <p className="campaignP">פרסם אטרקציה</p>
            </div> : null}
    </nav>
    )
}
export default NavBar;
