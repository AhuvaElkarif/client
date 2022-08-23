import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApprovalIcon from '@mui/icons-material/Approval';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIcon } from '@mui/material';

const NavBar = () => {
    const arr = [
        { to: "homePage", name: "דף הבית", role: [0, 1, 2, 3] },
        // { to: "regions", name: <SvgIcon component={PersonIcon} inheritViewBox></SvgIcon>, role: [0, 1] },
        // { to: "regions", name: <SvgIcon component={ApprovalIcon} inheritViewBox></SvgIcon>, role: [0, 1, 2, 3] },
        { to: "attractionsList", name: "אטרקציות", role: [0, 1, 2, 3] },
        {
            login: {
                arr: [{ to: "register", name: "הרשמה", role: [0] },
                { to: "login", name: "התחברות", role: [0] },
                ]
            }
        },
        { to: "about", name: "אודות", role: [0, 1] },
        { to: "wishList", name: "❤", role: [0, 1] },
        { to: "orderList", name: "הזמנות", role: [1, 2, 3] },
        { to: "statistics", name: "סטטיסטיקות", role: [2, 3] },
        { to: "editAttraction", name: "הוספת אטרקציה", role: [2] },
        { to: "usersList", name: "מנהלי אטרקציות", role: [3] },
        { to: "register", name: "הוספת מנהל אטרקציה", role: [3] },
        { to: "exit", name: "יציאה", role: [1, 2, 3] }
    ];
    const user = useSelector(state => state.user);
    if (user == null)
        user = { status: 0 };
    useEffect(() => {

    }, []);

    return (<nav className="navBar">
        {arr.map(x => {
            return x.role.map((item, ind) => {
                return <div key={ind}>
                    {item == user.status ?
                        <Link key={x.name} to={x.to} className=".nav-link"> {x.name}</Link> : null}
                </div>
            })
        })}
    </nav>
    )
}
export default NavBar;
