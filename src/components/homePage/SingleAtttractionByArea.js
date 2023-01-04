import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleAtttractionByArea = ({ obj, id }) => {
    const navigate = useNavigate();
    const [arr, setArr] = useState([]);
    const  attractions  = useSelector(state =>  state.attractionArr);

    useEffect(()=>{
        // const vec = [...attractions.filter(x => !x.Seasons.includes(obj))];
        const vec=[...attractions.filter(x=>x.AreaId==id && x.Images!="" && x.Status==true)];
        vec.sort((a, b) => b.CountAvgGrading - a.CountAvgGrading);
        
        setArr(vec);
    }, [attractions]);
    return <Grid container spacing={2} style={{ cursor: "pointer" }}>
        {arr.length > 0 && arr.map((item, index) => {
            if (index < 4  && item.AreaId == id)
                return <Grid item xs={3} key={index}>
                    <img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`} style={{ height: "40vh" }}
                        onClick={() => navigate("/detailsAttraction/" + item.Id)} width="100%" />
                    <h2 style={{ marginBottom: "1rem" }}>{item.CategoryName} -  {item.Name}</h2>
                </Grid>
        })}
    </Grid>

}
export default SingleAtttractionByArea;