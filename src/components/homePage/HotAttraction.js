import { Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
const HotAttraction = ({obj}) => {
    const navigate = useNavigate();
    const attractions = useSelector(state => state.attractionArr);
    const [arr,setArr] = useState([]);
    useEffect(() => {
        const vec = attractions.filter(x=> x.Seasons.includes(obj) && x.Images!="" && x.Status==true);
        setArr(vec);
    }, [attractions]);
return<Fragment> <h1 className="header">| מה חם אצלנו כרגע</h1>
{arr.length>0 && <Grid container spacing={2} style={{height:"85vh", cursor:"pointer"}}>
      <Grid item xs={6}  >
        <h2 style={{position:"absolute", marginTop:"1rem",color:"white", marginRight:"1rem"}}>הכירו את {arr[0].Name}</h2>
      <img src={`http://localhost:81/img/${arr[0].Images.slice(0, 14)}`} onClick={()=> navigate("/detailsAttraction/" + arr[0].Id)} width="100%" style={{height:"85vh"}} alt="" /> 
      </Grid>
      <Grid item xs={6} style={{width:'50vw'}}>
      <h2 style={{position:"absolute", marginTop:"1rem",color:"white", marginRight:"1rem"}}>מתחשק לכם {arr[1].CategoryName}</h2>
       <img src={`http://localhost:81/img/${arr[1].Images.slice(0, 14)}`}  onClick={()=> navigate("/detailsAttraction/" + arr[1].Id)} width="100%" alt="" style={{height:'45vh'}} />
      </Grid>
      <Grid  item xs={3} sm={6}  md={6} style={{position:"relative", right:"43rem", bottom:"16rem",width:"23.2vw"}}>
      <h2 style={{position:"absolute", marginTop:"1rem",color:"white", marginRight:"1rem"}}> {arr[2].Name}</h2>
       <img src={`http://localhost:81/img/${arr[2].Images.slice(0, 14)}`} onClick={()=> navigate("/detailsAttraction/" + arr[2].Id)} width="100%" alt="" style={{height:'37vh',width:"23.2vw"}} />
      </Grid>
      <Grid  item xs={3} sm={6}  md={6} style={{ position:"relative", right:"21.5rem", bottom:"16rem",width:"23.2vw"}}>
      <h2 style={{position:"absolute", marginTop:"1rem",color:"white", marginRight:"1rem"}}> {arr[3].Name}</h2>
       <img src={`http://localhost:81/img/${arr[3].Images.slice(0, 14)}`}  onClick={()=> navigate("/detailsAttraction/" + arr[3].Id)}  width="100%" alt="" style={{height:'37vh',width:"23.2vw"}}/>
      </Grid>
    </Grid>}

</Fragment>
}
export default HotAttraction;