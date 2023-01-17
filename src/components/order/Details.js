import { useState } from "react";
import EquipmentList from "../equipment/EquipmentList";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import * as yup from "yup";
import "./Order.css";
import { Button } from "@material-ui/core";
import FormInput from "../formInput/FormInput";

const Input = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>
        <TextField id="outlined-multiline-flexible" label={lableName} multiline style={{ width: "30vw" }}
            name={name == "FirstName" ? name.substring(0, name.indexOf(" ")) : name == "LastName" ? name.substring(name.indexOf(" ") + 1) : name} type={type} {...register(name)}
            disabled={flag} value={user == null ? " " : name == "FirstName" ? user.Name.substring(0, user.Name.indexOf(" ")) : name == "LastName" ? user.Name.substring(user.Name.indexOf(" ") + 1) : user[name]} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}
const arr = [
    { lableName: "שם", name: "Name", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
    { lableName: 'דוא"ל', name: "Email", type: "mail" },
]
const Details = ({ price, onSubmit, type, id }) => {
    const [showList, setShowList] = useState(false);
    const user  = useSelector(state => state.user);
console.log(type)
    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    return (<div style={{ marginTop: "3rem", textAlign:"right", marginRight:"3rem", marginLeft:"3rem"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
                {arr.map(item => <div key={item.name}>
                    <FormInput
                        lableName={item.lableName}
                        name={item.name}
                        type={item.type}
                        errors={errors}
                        register={register}
                        user={user}
                        // flag={user}
                        width={"20vw"} />
                </div>
                )}
                <TextField id="outlined-multiline-flexible"
                    style={{ width: "20vw", backgroundColor: "#ebedf0" }}
                    multiline label="סכום לתשלום"
                    disabled="true" value={price} />
            <br />
            {user && <p>*במידה והינך רוצה לשנות את פרטי המזמין יש לערוך את הפרופיל באיזור האישי.</p>}<br />
            <p onClick={() => setShowList(!showList)} className="link" >רשימת ציוד</p>
            {showList ? <EquipmentList id={id} /> : null}
            <br />
            <Button variant="contained" size="medium" type="submit" style={{ backgroundColor: "orange", color: "white" }}>
                {type == 0 ? "בצע הזמנה" : "עדכן הזמנה"}  </Button>
        </form> <br />
        <div className="creditCard">
            <p>אתר זה מכבד את הכרטיסים הבאים:</p>
            <img src="../../images/creditCards.png" />
        </div>
    </div>
    )

}
export default Details;