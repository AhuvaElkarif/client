import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApprovalIcon from '@mui/icons-material/Approval';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountMenu from "./AccountMenu";
import './NavBar.css';

const arr = [
    { to: "homePage", name: "דף הבית", role: [0, 1, 2] },
    { to: "attractionsList/" + 0, name: "אטרקציות", role: [0, 1] },
    { to: "attractionsList/" + 2, name: "אטרקציות", role: [2] },
    { to: "register" , name: "הרשמה", role: [0] },
    { to: "login/"+0 , name: "התחברות", role: [0] },
    { to: "about" , name: "אודות", role: [0, 1] },
    { to: "wishList", name: "❤", role: [0, 1] },
    // { to: "statistics", name: "סטטיסטיקות", role: [2, 3] },
    { to: "usersList", name: "מנהלי אטרקציות", role: [2] },
    // { to: "categoriesList", name: "קטגוריות ממתינות לאישור", role: [2] },
    // { to: "register", name: "הוספת מנהל אטרקציה", role: [3] },
];
const NavBar = () => {
    const navigate = useNavigate();
    let user = useSelector(state => state.user);
    if (user == null)
        user = { Status: 0 };

    return (<nav className="navBar">
        {user.Status != 0 &&<div className="accountMenu"> <AccountMenu /> </div>}
        {arr.map(x => {
            return x.role.map((item, ind) => {
                if (item == user.Status) return <div key={ind}>
                    <Link key={x.name} to={x.to} className="navBar-link">
                        {x.name}
                    </Link></div>
            })
        })}

        {/* {user.Status == 0 || user.Status == 1 ? */}
        {user.Status == 0  ?
            <div onClick={() => { navigate("/login/" + 2) }} className='campaign'>
                <CampaignIcon />
                <p className="campaignP">פרסם אטרקציה</p>
            </div> : null}
    </nav>
    )
}
export default NavBar;
