import { useEffect, useState } from "react";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import "./Order.css";
import AutoGrid from "./AutoGrid";
import { useSelector } from "react-redux";
import Amount from "./Amount";

const SelectTickets = ({ attractionId, setFlag, setPrice, amount, setAmount }) => {
    const [image, setImage] = useState([]);
    const attractions = useSelector(state => state.attractionArr);
    const product = { ...attractions.find(x => x.Id == attractionId) };

    useEffect(() => {
        getImagesByAttractionId(attractionId)
            .then(x => setImage(x.data))
            .catch(err => console.log(err))
    }, [attractionId]);

    useEffect(() => {
        setPrice(amount * product.Price);
    }, [image, amount]);

    return <div>
        <h1>בחרו את כמות הכרטיסים</h1>
        <div className='all-images'>{image.map((item, ind) => {
            if (ind < 3)
                return <span key={item.Id}> {ind <= 5 ? <img src={`http://localhost:81/img/${item.Img}`}
                    className="imgOrder" /> : null} </span>
        })} </div>
        <br /><br />

        <AutoGrid item1={"סוג הכרטיס"} item2={"מחיר"} item3={"כמות"} />
        <hr />

        <AutoGrid item1={" כרטיס יחיד(מגיל " + product.FromAge + "עד גיל " + product.TillAge + ")"}
            item2={"₪" + product.Price}
            item3={<Amount amount={amount} setAmount={setAmount} setFlag={setFlag} />} />
        <hr />
        <span>סה"כ מחיר לתשלום {"₪" + amount * product.Price}</span>
    </div>
}
export default SelectTickets;