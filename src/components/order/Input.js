import React, { Fragment } from "react";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';


const Input = ({ register, errors, name, lableName, type, product, flag, user }) => {
    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
        CreditNum: yup.number("שדה זה חובה").required("שדה זה חובה").min(16, 'לא תקין').max(16, 'לא תקין'),
        DigitsCredit: yup.number("שדה זה חובה").required("שדה זה חובה").min(3, 'לא תקין').max(3, 'לא תקין'),
        Valid: yup.number("שדה זה חובה").required("שדה זה חובה"),
        Quantity: yup.number("הכנס כמות").required("שדה זה חובה").min(product.MinParticipant, 'כמות אינה תקינה').max(product.MaxParticipant, 'כמות אינה תקינה'),
        Quantity: yup.date("הכנס תאריך").required("שדה זה חובה").min(new Date().toISOString().substring(0, 10))
    }).required();
    return <>
        <TextField id="standard-basic" label={lableName}
            name={name} type={type} {...register(name)} variant="standard"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}
export default Input;
