import react, { useEffect, useState } from "react";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import "./Order.css";
import AutoGrid from "./AutoGrid";
import { useSelector } from "react-redux";

const SelectTickets = ({ date, attractionId }) => {
    const [image, setImage] = useState([]);
    const attractions = useSelector(state => state.attractionArr );
    const product = { ...attractions.find(x => x.Id == attractionId) };
    useEffect(() => {
        getImagesByAttractionId(attractionId)
            .then(x => setImage(x.data))
            .catch(err => console.log(err))
    }, [attractionId]);
    useEffect(() => {
    }, [image]);
    return (
        <div>
            בחרו את כמות הכרטיסים
            {/* <h1>יום {date.getDay()} {date.toLocaleDateString('en-GB')}</h1> */}
            {image.map((item, ind) => {
                return <span key={item.Id}> {ind <= 5 ? <img src={`C:\\inetpub\\wwwroot\\image\\${item.Img}`}
                    className="imgOrder" /> : null} </span>
            })}
            <br/><br/>
            <AutoGrid item1={"סוג הכרטיס"} item2={"מחיר"} item3={"כמות"} />
            <hr/>
            <AutoGrid item1={"כרטיס יחיד(מגיל "+product.FromAge+"עד גיל "+product.TillAge+")"} item2={"₪"+product.Price} item3={"ךך"} />
        </div>
    )
}
export default SelectTickets;