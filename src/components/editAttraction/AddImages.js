import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './EditAttraction.css';
const AddImages = ({ onSubmit, attraction }) => {

    const [arr, setArr] = useState(new Array(6).fill(""));
    useEffect(() => {

        if (attraction != null) {
            let i = 0;
            const copy = [...arr];
            for (let index = 0; index < copy.length; index++) {
                copy[index]=attraction.Images.substring(i, i+14);
                i += 15;
                
            }
            setArr(copy);
        }
    }, [])
    const handleChange = (e, ind) => {
        const FileName = e.target.files[0].name.slice(-14);
        const formData = new FormData();
        console.log(e.target.files[0])
        formData.append('Image', e.target.files[0]);
        formData.append('FileName', FileName);
        formData.append('AttractionId', attraction.Id);
        if (arr[ind] != '')
            axios.delete(`http://localhost:57828/api/Image?image=` + FileName)
                .then(x => {
                    console.log(x.data);
                })
                .catch(err => console.log("קרתה שגיה זמנית באתר"));
        axios.post(`http://localhost:57828/api/Image`, formData)
            .then(x => {
                console.log(x.data);
                const copy = [...arr];
                copy[ind] = FileName;
                setArr([...copy]);
            })
            .catch(err => console.log("קרתה שגיה זמנית באתר"))
        console.log(arr)
    }
    return <div>
        <p>ניתן להעלות עד 10 תמונות ע"י גרירה או לחיצה על כפתור הפלוס. אחרי הבחירה, בחרו את מרכז התמונה כדי שתופיע באתר בצורה המוקטנת הטובה ביותר. </p>
        <p> <b> אין לכם מה לדאוג, בגלריה התמונה תופיע בגודלה המקורי.</b> </p>
        <div className='div-border'> תמונה ראשית
            <div className='div-container'>
                <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={(e) => { handleChange(e, 0) }} />
                    <AddIcon />
                </IconButton>
                {arr[0] != '' ? <img src={`http://localhost:81/img/${arr[0]}`} className="add-img" /> : <p> העלאת תמונות </p>}
            </div>
        </div>
        <hr />
        <h2> תמונות שיופיעו בגוף האטרציה </h2>
        <div className="product-list">
            {arr ? arr.map((item, index) => {
                if (index != 0) return <div className='div-images' key={index}>
                    <IconButton aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={(e) => { handleChange(e, index) }} />
                        <AddIcon />
                    </IconButton>
                    {item != '' && index != 0 ? <img src={`http://localhost:81/img/${item}`} className="add-img" /> : <p> העלאת תמונות </p>}
                </div>
            }) : null}
        </div>
        <Button variant="contained" size="medium" onClick={onSubmit}> להמשיך לשלב הבא </Button>
    </div>
}
export default AddImages;