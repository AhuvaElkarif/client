import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import './EditAttraction.css';
const AddImages = () => {
    const [arr, setArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const handleChange = (e, ind) => {
        const copy = { ...arr };
        copy[ind] = e.target.value;
        setArr({ ...copy });
        console.log(arr)
    }
    return (
        <div>
            <p>ניתן להעלות עד 10 תמונות ע"י גרירה או לחיצה על כפתור הפלוס. אחרי הבחירה, בחרו את מרכז התמונה כדי שתופיע באתר בצורה המוקטנת הטובה ביותר. </p>
            <p> <b> אין לכם מה לדאוג, בגלריה התמונה תופיע בגודלה המקורי.</b> </p>
            <div className='div-border'> תמונה ראשית
                <div className='div-container'>
                    <IconButton aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={(e) => { handleChange(e, 0) }} />
                        <AddIcon />
                    </IconButton>
                    <p> העלאת תמונות </p>
                </div>
            </div>
            <hr />
            <h2> תמונות שיופיעו בגוף האטרציה </h2>
            <div className="product-list">
                {arr ? arr.map((item, index) => { return <div className='div-images' key={index}>
                    <IconButton aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={(e) => { handleChange(e, index) }} />
                        <AddIcon />
                    </IconButton>
                    <p> העלאת תמונות </p>
                </div>}):null}
            </div>
        </div>

    )
}
export default AddImages;