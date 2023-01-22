import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import ButtomNavigation from "../bottomNavigation/ButtomNavigation";
import './Regions.css';

const Regions = () => {
    const [flag, setFlag] = useState(true);
    const user = useSelector(state => state.user);

    return (<div className="bottom">
        <h1> {user.Name}  <EditIcon onClick={() => { setFlag(!flag) }} /> </h1> <br />
        <p>
            פלאפון: {user.Phone} |
            דוא"ל : {user.Email}
        </p> <br />
        {flag && <ButtomNavigation />}
    </div>
    )
}
export default Regions;
