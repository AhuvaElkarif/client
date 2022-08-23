import { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import EquipmentList from "../equipment/EquipmentList";
import { shallowEqual, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrder } from "../../store/actions/OrderAction";
import React from "react";
import * as yup from "yup";
import InputLabel from '@material-ui/core/InputLabel';
import "./Order.css";

const Input = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>
        <TextField id="standard-basic" label={lableName}
            name={name} type={type} {...register(name)} variant="standard"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}

const Select = React.forwardRef(({ onChange, onBlur, name, lableName, arr }, ref) => (
    <>
        {/* <InputLabel>{lableName} </InputLabel> */}
        <select lableName={lableName} name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            {arr.map((x,ind) => <option key={ind} value={x}>{x}</option>)}
        </select>
    </>
));

const Details = () => {
    const { user, attractions } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user
        }
    }, shallowEqual);

    const navigate = useNavigate();
    const { flag, type, id } = useParams();
    const product = { ...attractions.find(x => x.Id == id) };
    const monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];
    const year = new Date().getFullYear();
    const yearArr  = [year, year+1, year+2,year+3,year+4,year+5,year+6,year+7,year+8,year+9]
    const [showList, setShowList] = useState(false);
    const [valid, setValid] = useState(null);
    const dateRef = useRef(0);

    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
        CreditNum: yup.number("שדה זה חובה").required("שדה זה חובה"),//.min(16, 'לא תקין').max(16, 'לא תקין'),
        DigitsCredit: yup.number("שדה זה חובה").required("שדה זה חובה"),//.min(3, 'לא תקין').max(3, 'לא תקין'),
        Valid: yup.number("שדה זה חובה").required("שדה זה חובה"),
        Quantity: yup.number("הכנס כמות").required("שדה זה חובה").min(product.MinParticipant, 'כמות אינה תקינה').max(product.MaxParticipant, 'כמות אינה תקינה'),
        Date: yup.date("הכנס תאריך").required("שדה זה חובה").min(new Date().toISOString().substring(0, 10), "תאריך לא תקין")
    }).required();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        console.log(data.Date)
        // validDate();
        addOrder({ UserId: user.id, OrderDate: data.Date, GlobalPrice: data.Quantity * product.Price })
            .then(navigate("/order/" + true + "/" + type + "/" + product.Id))
            .catch(err => console.log(err));
    };
    const save = () => {
        navigate("/message" + "/" + product.Id + "/" + 3 + "/" + false);

    }
    console.log(id)
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="location">

            <Input lableName="שם משתמש" user={user} register={register} errors={errors} flag={flag} name="Name" type="text" />
            <Input lableName="פלאפון" user={user} register={register} errors={errors} flag={flag} name="Phone" type="text" />
            <Input lableName="מייל" user={user} register={register} errors={errors} flag={flag} name="Email" type="text" />

            <Input lableName="מספר כרטיס" user={null} register={register} errors={errors} flag={flag} name="CreditNum" type="number" />
            <Input lableName="קוד אימות כרטיס" user={null} register={register} errors={errors} flag={flag} name="DigitsCredit" type="number" />
            <Select lableName="שנה" name="year" onChange={(e)=>{product[e.target.name]=e.target.value}} arr={yearArr} /> / 
            <Select lableName="חודש" name="month" onChange={(e)=>{product[e.target.name]=e.target.value}} arr={monthArr} />
            <p onClick={() => setShowList(!showList)} className="link" >רשימת ציוד</p>
            {showList ? <EquipmentList id={id} /> : null}
            {flag == "true" ? <input type="button" value="סיום" onClick={save} />
                : type == 0 ?
                    <input type="submit" value="בצע הזמנה" />
                    : <input type="submit" value="עדכן הזמנה" />}
        </form>
    </>)

}
export default Details;