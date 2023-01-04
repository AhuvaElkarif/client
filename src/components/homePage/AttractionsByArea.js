import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAreas } from '../../store/actions/AreaAction';
import SingleAtttractionByArea from "./SingleAtttractionByArea";

const AttractionsByArea = ({ obj }) => {
    const [area, setArea] = useState([]);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    useEffect(() => {
        getAreas()
            .then(x => setArea(x.data))
            .catch(err => console.log(err));
    }, []);
    return <div>
        {area.length > 0 && area.map(item => {
            return <div key={item.Id}>
                <h1 className="header">| אטרקציות ב{item.Name}</h1>
                <SingleAtttractionByArea id={item.Id} obj={obj} />
                <Button variant="contained" style={{ backgroundColor: "orange", color:"white" }}
                    onClick={() => { navigate(`/attractionsList/${user.Status == 2 ? 2 : 0}/`+item.Id) }}
                >  לכל האטרקציות ב{item.Name}  </Button>
            </div>
        })}

    </div>
}
export default AttractionsByArea;