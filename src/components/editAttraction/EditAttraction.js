import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import swal from "sweetalert";
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import { addAttraction, updateAttraction } from "../../store/actions/AttractionActions";
import SelectTextFields from "../attractionsList/SelectTextFields";
import { TextField } from "@mui/material";
import { addCategory } from "../../store/actions/CategoryAction";
import { getAreas } from "../../store/actions/AreaAction";
import { ContactsOutlined } from "@material-ui/icons";

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה"),
    Description: yup.string().required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    Address: yup.string().required("שדה זה חובה"),
    Price: yup.string().required("שדה זה חובה"),
    MinParticipant: yup.string().required("שדה זה חובה"),
    MaxParticipant: yup.string().required("שדה זה חובה").matches(/(?=.*\d)/),
    IsAvailable: yup.string(),//.required("שדה זה חובה"),
    TimeDuration: yup.string().required("שדה זה חובה"),
    FromAge: yup.string().required("שדה זה חובה"),
    TillAge: yup.string().required("שדה זה חובה"),
    DaysToCancel: yup.string().required("שדה זה חובה"),
   
}).required();
const arr = [
    { lableName: "שם אטרקציה", name: "Name", type: "text" },
    { lableName: "תיאור האטרקציה", name: "Description", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "text" },
    { lableName: "כתובת", name: "Address", type: "text" },
    { lableName: "מחיר", name: "Price", type: "number" },
    { lableName: "מספר משתתפים מינימלי", name: "MinParticipant", type: "number" },
    { lableName: "מספר משתתפים מקסימלי", name: "MaxParticipant", type: "number" },
    { lableName: "משך זמן האטרקציה (בדקות)", name: "TimeDuration", type: "number" },
    { lableName: "מגיל(כולל)", name: "FromAge", type: "number" },
    { lableName: "עד גיל(כולל)", name: "TillAge", type: "number" },
    { lableName: "מספר ימים לביטול", name: "DaysToCancel", type: "number" },
    { lableName: "האטרקציה זמינה כעת", name: "IsAvailable", type: "checkbox" }
]
  
const EditAttraction = ({ type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [value, setValue] = useState("")
    const [categoy, setCategory] = useState(null);
    const [areas, setAreas] = useState(null);
    const [area, setArea] = useState(null);
    const [flag, setFlag] = useState(true);
    const [display, setDisplay] = useState(true);
    const [error, setError] = useState(false);
    const { user, attractions, categories } = useSelector(state => {
        return {
            user: state.user,
            attractions: state.attractionArr,
            categories: state.categoriesArr
        }
    }, shallowEqual);
    let attraction = { ...attractions.find(x => x.Id == id) };

    useEffect(() => {
        getAreas()
        .then(x => setAreas(x.data))
        .catch(err => alert("קרתה תקלה זמנית, אנו מתנצלים."))
        if (type == "new")
            attraction = null;
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setFlag(false);
        data.Date = new Date();
        data.Status = true;
        data.CategoryId = categoy;
        data.ManagerId = user.Id;
        data.AreaId = area;
        if (type == "new")
            dispatch(addAttraction(data));
        else {
            data.Id=id;
            dispatch(updateAttraction(data));
        }
    };

    const add = () => {
        if (value == "") {
            setError(true);
            return;
        }
        const o = { "Name": value, "Status": false };
        dispatch(addCategory(o))
        setDisplay(true);
        swal({
            title: "התבצע בהצלחה!",
            text: "הקטגוריה נשלחה לטיפוך המנהל.",
            icon: "success",
            button: "סיום",
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {arr.map(item => <div key={item.name}>
                <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={attraction}
                    flag={false} /></div>
            )}
           <SelectTextFields
                handleChange={({ target }) => { setCategory(target.value) }}
                currencies={categories} text={"בחר קטגוריה"} />
            {areas && <SelectTextFields
                handleChange={({ target }) => { setArea(target.value) }}
                currencies={areas} text={"בחר איזור"} />}
            {display ? <Button variant="contained" onClick={() => { setDisplay(false) }}>הוסף קטגוריה</Button> 
                : <><TextField id="standard-basic" onChange={(e) => { setValue(e.target.value); if (value != "") setError(false) }} label="הכנס קטגוריה" variant="standard" />
                    {error && <span style={{ color: "red" }}>יש להכניס קטגוריה</span>}
                    <Button variant="contained" onClick={add}> הגש לאישור</Button>
                </>}<br /> 
            {/* {display ? <Button variant="contained" onClick={() => { setDisplay(false) }}>הוסף קטגוריה</Button>
                : <><TextField id="standard-basic" onChange={(e) => { setValue(e.target.value); if (value != "") setError(false) }} label="הכנס קטגוריה" variant="standard" />
                    {error && <span style={{ color: "red" }}>יש להכניס קטגוריה</span>}
                    <Button variant="contained" onClick={add}> הגש לאישור</Button><br />
                </>} */}
            {!flag ?
                <AlertMessage
                    variant={'success'}
                    children={<Alerts message={type = "new" ? "התווסף בהצלחה!" : "עודכן בהצלחה!"} />} />
                : <Button variant="contained" size="medium" type="submit"> {type == "new" ? "הוסף" : "עדכן"} </Button>}
            {/* <label><input type="folder" name="image" placeholder="תמונה" defaultValue={item.image} onChange={change} /></label> <br /><br /> */}

        </form>
    )
}
export default EditAttraction;