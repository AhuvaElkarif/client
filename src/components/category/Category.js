import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, deleteCategory, getWaitingCategories } from "../../store/actions/CategoryAction";
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import "../reportsList/ReportsList.css"
import SingleCategory from "./SingleCategory";

const Category = () => {
    const [arr, setArr] = useState(null);
    const [flag, setFlag] = useState(false);
    const [img, setImg] = useState('');
    const [type,setType] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        getWaitingCategories()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, [])

    const add = (item) => {
        setFlag(true);
        setType(1);
        const formData = new FormData();
        formData.append('Img', img);
        formData.append('FileName', img.name);
        formData.append('Name', item.Name);
        formData.append('Id', item.Id);
        console.log(formData)
        dispatch(changeStatus(formData));
        const x = arr.filter(x => x.Id != item.Id);
        setArr(x);
    }
    const categoryDeleted = (item) => {
        setFlag(true);
        setType(2);
        dispatch(deleteCategory(item));
        const vec = [...arr.filter(x => x.Id != item.Id)];
        setArr([...vec]);
    }
    return (
        <div>
            <h2 className="h2"> קטגוריות ממתינות לאישור </h2>
            {flag && <div style={{width:"60vw"}}><AlertMessage
                            setFlag={setFlag}
                            variant={'success'}
                            children={<Alerts message={type==1?"אושר בהצלחה!":"נמחק בהצלחה!"} />} /> </div>}
            <ul className="product-list" style={{ marginTop: "-5rem", marginRight: "3.4rem" }}>
                {arr ? arr.map(item => {
                    return <div key={item.Id} className="container">
                        <SingleCategory setImg={setImg} item={item} add={add} categoryDeleted={categoryDeleted} />
                       
                    </div>
                }) : <p> אין כרגע קטגוריות הממתינות לאישור. </p>}
            </ul>
        </div>
    )
}
export default Category;