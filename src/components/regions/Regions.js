import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "../register/Register";
import ButtomNavigation from "../bottomNavigation/ButtomNavigation";
const Regions = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const user = useSelector(state => state.user);
  
    return (<div>
        <h1> {user.Name}  <EditIcon onClick={()=>{setFlag(!flag)}} /> </h1>
        <p>
            פלאפון: {user.Phone} |
            דוא"ל : {user.Email} 
        </p>
        {flag && <ButtomNavigation/>}
    </div>
    )
}
export default Regions;
