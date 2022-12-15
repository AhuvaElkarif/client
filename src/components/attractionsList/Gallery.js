import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { StarRate } from "@mui/icons-material";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";

const Gallery = ({id}) => {
    const [arr, setArr] = useState();
    useEffect(()=>{
        getImagesByAttractionId(id)
        .then(x=> setArr(x.data))
        .catch(err => console.log(err));
    },[])
        return (
    <div  style={{height:"10vh", width:"80vw", position:"relative", right:"7rem", display:"block"}}>
        {/* <Carousel autoPlay axis="vertical" infiniteLoop interval="5000"> */}
        <Carousel autoPlay axis="vertical" interval="4000" >
            {arr?arr.map(item=>{ return <div>
                <img src={`http://localhost:81/img/${item.Img}`} alt="" />
                {/*  <p className="legend">My Photo 5</p> */}
            </div>

            }):null}
        </Carousel>
    </div>
)
    };
export default Gallery