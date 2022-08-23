import { useState } from "react";
import { useNavigate } from "react-router";
import "./SingleAttraction.css";
import Slideshow2 from "./SlideShow2";

const SingleAttraction2 = ({product}) => {
    const navigate = useNavigate();
    const [images, setImages] = useState([
        {
            url: './boat.jpg',
            caption: 'First Slide'
        },
        {
            url: './boat.jpg',

            caption: 'Second Slide'
        },
        {
            url: './boat.jpg',

            caption: 'Third Slide'
        }
    ]);
    return (<>
    {/* <Slideshow2 fadeImages={images} onClick={()=>{navigate("/detailsAttraction/"+product.Id)}}/> */}
        <div className="img"> <img src={ `images/${product.Image}`} onClick={()=>{navigate("/detailsAttraction/"+product.Id)}}/></div><br/>
        <h3>{product.Name}</h3>
        <p>{product.Description}</p>
        <p>{product.Address}</p>
        <p> {product.Price} {'ש"ח'}</p>
        </>
    );
}
export default SingleAttraction2;