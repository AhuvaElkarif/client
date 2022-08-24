import { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import EquipmentList from "../equipment/EquipmentList";
import { shallowEqual, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrder } from "../../store/actions/OrderAction";
import * as yup from "yup";
import "./Order.css";

const Input = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>
        <TextField id="standard-basic" label={lableName}
            name={name} type={type} {...register(name)} variant="standard"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}

const Order = () => {
    const { user, attractions } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user
        }
    }, shallowEqual);

    const navigate = useNavigate();
    // const [dateMessage, setDateMessage] = useState(false);
    const { flag, type, id } = useParams();
    const product = { ...attractions.find(x => x.Id == id) };
    const location = useLocation();
    const [showList, setShowList] = useState(false);
    const [valid, setValid] = useState(null);
    const dateRef = useRef(0);

    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
        Quantity: yup.string("הכנס כמות").required("שדה זה חובה").matches(/^d/).min(product.MinParticipant, 'כמות אינה תקינה').max(product.MaxParticipant, 'כמות אינה תקינה'),
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
    // const changeDate = (e) => {
    //     if (e.target.value < new Date().toISOString().substring(0, 10))
    //         setDateMessage(true);
    //     else {
    //         setDateMessage(false);
    //     }
    // }


    // const validDate = () => {
    //     if (dateRef.current.value == "" || dateMessage) {
    //         alert("נא הכנס תאריך הזמנה");
    //         return false;
    //     }
    //     return true;
    // }
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            <Input lableName="שם משתמש" user={user} register={register} errors={errors} flag={flag} name="Name" type="text" />
            <Input lableName="פלאפון" user={user} register={register} errors={errors} flag={flag} name="Phone" type="text" />
            <Input lableName="מייל" user={user} register={register} errors={errors} flag={flag} name="Email" type="text" />
            <Input lableName="כרטיס אשראי" user={null} register={register} errors={errors} flag={flag} name="CreditNum" type="number" />
            <Input lableName="ספרות בגב הכרטיס" user={null} register={register} errors={errors} flag={flag} name="DigitsCredit" type="number" />
            <Input lableName="תוקף" user={null} register={register} errors={errors} flag={flag} name="Valid" type="number" />
            <Input lableName="הכנס כמות" user={null} register={register} errors={errors} flag={flag} name="Quantity" type="number" />





            {/* <TextField id="standard-basic" label="שם משתמש" name="Name" type="text" variant="standard" {...register("Name")} disabled={flag == "true"} defaultValue={user != null ? user.Name : ""} /> */}
            {/* <TextField id="standard-basic" label="פלאפון" name="Phone" type="text" variant="standard" {...register("Phone")} disabled={flag == "true"} defaultValue={user != null ? user.Phone : ""} />
            <TextField id="standard-basic" label="מייל" name="Email" type="text" variant="standard" {...register("Email")} disabled={flag == "true"} defaultValue={user != null ? user.Email : ""} />
            <TextField id="standard-basic" label="כרטיס אשראי" name="CreditNum" type="number" variant="standard" disabled={flag == "true"} />
            <TextField id="standard-basic" label="ספרות בגב הכרטיס" name="DigitsCredit" type="number" variant="standard" disabled={flag == "true"} />
            <TextField id="standard-basic" label="תוקף" name="Valid" type="number" variant="standard" disabled={flag == "true"} />
            <TextField id="standard-basic" label="הכנס כמות" name="Quantity" variant="standard" disabled={flag == "true"} {...register('Quantity')} />
            <span className="warn">{valid}</span> */}
            <TextField id="standard-basic" name="Date" type="date" variant="standard" disabled={flag == "true"}  {...register("Date")} />
            {/* {dateMessage && <div className="warn">הכנס תאריך תקין</div>} */}
            <p onClick={() => setShowList(!showList)} className="link" >רשימת ציוד</p>
            {showList ? <EquipmentList id={id} /> : null}
            {/* <br /> <input className="order" type="button" value="הזמן" onClick={() => { qty.current.value > 0 && message == null ? navigate("/order/" + false + "/" + 1+ "/" + qty.current.value) : message == null ? setValid("הכנס כמות!") : setValid(null) }} /> */}
            {flag == "true" ? <input type="button" value="סיום" onClick={save} />
                : type == 0 ?
                    <input type="submit" value="בצע הזמנה" />
                    : <input type="submit" value="עדכן הזמנה" />}
            {/* onClick={() => { if (validDate()) navigate("/order/" + true + "/" + 1 + "/" + product.Id) }} />} */}
        </form>
    </>)

}
export default Order;