import react, { useEffect, useState } from "react";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import "./Order.css";
import AutoGrid from "./AutoGrid";
import { shallowEqual, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Amount from "./Amount";

const SelectTickets = ({ attractionId, setFlag, setPrice }) => {
    const [image, setImage] = useState([]);
    const [amount, setAmount] = useState(0);
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
    return (
        <div>
            <h1>בחרו את כמות הכרטיסים</h1>
            {/* <h1>יום {date.getDay()} {date.toLocaleDateString('en-GB')}</h1> */}
            <div className='all-images'>{image.map((item, ind) => {
                return <span key={item.Id}> {ind <= 5 ? <img src={`http://localhost:81/img/${item.Img}`}
                    className="imgOrder" /> : null} </span>
            })} </div>
            <br /><br />
            <AutoGrid item1={"סוג הכרטיס"} item2={"מחיר"} item3={"כמות"} />
            <hr />
            <AutoGrid item1={" כרטיס יחיד(מגיל " + product.FromAge + "עד גיל " + product.TillAge + ")"} item2={"₪" + product.Price} item3={<Amount amount={amount} setAmount={setAmount} setFlag={setFlag} />} />
            <hr />
            <span>סה"כ מחיר לתשלום {"₪" + amount * product.Price}</span>
        </div>
    )
}
export default SelectTickets;