import {Link} from "react-router-dom";
import ApprovalIcon from '@mui/icons-material/Approval';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIcon } from '@mui/material';
import { connect } from "react-redux";
import './NavBar.css';
import { currentUser } from "../../store/actions/UserActions";

const UserNavBar = () => (
<nav className="nav">
    <Link to="homePage" className="link"> דף הבית </Link>
    <Link to="regions" className="link" > <SvgIcon component={ApprovalIcon} inheritViewBox></SvgIcon> </Link>
    <Link to="regions" className="link" > <SvgIcon component={PersonIcon} inheritViewBox></SvgIcon> </Link>
    <Link to="attractionsList" className="link"> אטרקציות </Link>
    <Link to="order" className="link">  הזמנות </Link>
    <Link to="about" className="link">  אודות </Link>
    <Link to="wishList" className="link"> ❤  </Link>
    <Link to="orderList" className="link"> רשימת ההזמנות </Link>
    <Link to="exit" className="link" onClick={()=>currentUser(null)}> יציאה </Link>

</nav>
)
export default UserNavBar;