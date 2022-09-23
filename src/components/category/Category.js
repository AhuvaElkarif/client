import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeStatus, getWaitingCategories } from "../../store/actions/CategoryAction";
import DeleteIcon from '@mui/icons-material/Delete';
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import Poppers from "../popper/Popper";

const Category = () => {
    const [arr, setArr] = useState(null);
    const [flag, setFlag] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        getWaitingCategories()
            .then(x => setArr(x.data))
            .catch(err => console.log(err))
    }, [])

    const add = (item) => {
        dispatch(changeStatus(item));
        const x = arr.filter(x => x.Id != item.Id);
        setFlag(false);
        setArr(x);
    }
    const categoryDeleted = (item) =>{
     
    }
    return (
        <div>
            <ul>
                {arr ? arr.map(item => {
                    return <div key={item.Id}>
                        <li>{item.Name}</li>
                        <Poppers
                            type={3}
                            content={"אשר"}
                            func={() => { add(item) }}
                            text="אשר את הקטגוריה" />
                        <Poppers
                            type={1}
                            content={<DeleteIcon/>}
                            func={() => { categoryDeleted(item) }}
                            text="מחוק את הקטגוריה" />
                        {/*  <AlertMessage
                             variant={'success'}
                             children={<Alerts message={"אושר בהצלחה!"} />} />} */}
                    </div>
                }) : null}
            </ul>
        </div>
    )
}
export default Category;