import react, { useEffect, useState } from "react";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import "./Order.css";
import AutoGrid from "./AutoGrid";
import { shallowEqual, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SelectTickets = ({attractionId , setFlag, setPrice}) => {
    const [image, setImage] = useState([]);
    const [amount,setAmount] = useState(0);
    const { attractions } = useSelector(state => {
        return {
            attractions: state.attractionArr
        }
    }, shallowEqual);
    const product = { ...attractions.find(x => x.Id == attractionId) };
    useEffect(() => {
        getImagesByAttractionId(attractionId)
            .then(x => setImage(x.data))
            .catch(err => console.log(err))
    }, [attractionId]);
    useEffect(() => {
        setPrice(amount*product.Price);
    }, [image, amount]);
    return (
        <div>
           <h1>בחרו את כמות הכרטיסים</h1> 
            {/* <h1>יום {date.getDay()} {date.toLocaleDateString('en-GB')}</h1> */}
            {image.map((item, ind) => {
                return <span key={item.Id}> {ind <= 5 ? <img src={`C:\\inetpub\\wwwroot\\image\\${item.Img}`}
                    className="imgOrder" /> : null} </span>
            })}
            <br/><br/>
            <AutoGrid item1={"סוג הכרטיס"} item2={"מחיר"} item3={"כמות"} />
            <hr/>
            <AutoGrid item1={" כרטיס יחיד(מגיל "+product.FromAge+"עד גיל "+product.TillAge+")"} item2={"₪"+product.Price} item3={<AddIcon onClick={()=>{setAmount(amount+1);}}/>+""+{amount}+""+<RemoveIcon onClick={()=>{if(amount>0) setAmount(amount-1);}}/>} />
            <hr/>
            <RemoveIcon onClick={()=>{if(amount>0) setAmount(amount-1); if(amount==0 || amount==1) setFlag(false)}} fontSize="small"/> <span style={{fontSize:"x-large"}}> {amount} </span> <AddIcon fontSize="small" onClick={()=>{setAmount(amount+1); setFlag(true);}}/>
            <p>סה"כ מחיר לתשלום {"₪"+amount*product.Price}</p>
        </div>
    )
}
export default SelectTickets;