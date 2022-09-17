import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import EquipmentList from "../equipment/EquipmentList";
import { shallowEqual, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrder } from "../../store/actions/OrderAction";
import React from "react";
import * as yup from "yup";
import "./Order.css";
import { Button } from "@material-ui/core";
import DisplayUserDetails from "./DisplayUserDetails";

const Input = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>
        <TextField id="outlined-multiline-flexible" label={lableName} multiline style={{ width: "30vw" }}
            name={name == "FirstName" ? name.substring(0, name.indexOf(" ")) : name == "LastName" ? name.substring(name.indexOf(" ") + 1) : name} type={type} {...register(name)}
            disabled={flag} value={user == null ? " " : name == "FirstName" ? user.Name.substring(0, user.Name.indexOf(" ")) : name == "LastName" ? user.Name.substring(user.Name.indexOf(" ") + 1) : user[name]} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}

const Details = ({ price, date }) => {
    const { user, attractions } = useSelector(state => {
        return {
            attractions: state.attractionArr,
            user: state.user
        }
    }, shallowEqual);

    const navigate = useNavigate();
    const { flag, type, id } = useParams();
    const product = { ...attractions.find(x => x.Id == id) };
    const [showList, setShowList] = useState(false);

    const schema = yup.object({
        FirstName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        LastName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
        // Date: yup.date("הכנס תאריך").required("שדה זה חובה").min(new Date().toISOString().substring(0, 10), "תאריך לא תקין")
    }).required();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        addOrder({ UserId: user.Id, OrderDate: date, GlobalPrice: price })
            .then(navigate("/order/" + true + "/" + type + "/" + product.Id))
            .catch(err => console.log(err));
    };
    const save = () => {
        navigate("/message" + "/" + product.Id + "/" + 3 + "/" + false);

    }
    return (<div>
       <form onSubmit={handleSubmit(onSubmit)}>
            <Input lableName="שם פרטי" user={user} register={register} errors={errors} flag={flag} name="FirstName" type="text" />
            <Input lableName="שם משפחה" user={user} register={register} errors={errors} flag={flag} name="LastName" type="text" />
            <Input lableName="פלאפון" user={user} register={register} errors={errors} flag={flag} name="Phone" type="text" />
            <Input lableName="מייל" user={user} register={register} errors={errors} flag={flag} name="Email" type="text" />
            <TextField id="outlined-multiline-flexible" style={{ width: "30vw" }} multiline label="סכום לתשלום" disabled="true" value={price} />
            <p onClick={() => setShowList(!showList)} className="link" >רשימת ציוד</p>
            {showList ? <EquipmentList id={id} /> : null}
            {flag ?  <Button variant="contained" size="medium" onClick={save}>בצע הזמנה</Button>
                : type == 0 ?
                    <Button variant="contained" size="medium" type="submit">בצע הזמנה</Button>
                    : <Button variant="contained" size="medium" type="submit">עדכן הזמנה</Button>}
        </form>
        <div className="creditCard">
            <p>אתר זה מכבד את הכרטיסים הבאים:</p>
            <img src="./images/creditCards.png" />
        </div>
    </div>
    )

}
export default Details;