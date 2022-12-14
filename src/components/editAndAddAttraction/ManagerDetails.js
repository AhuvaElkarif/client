import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import { Button } from "@material-ui/core";
import './EditAttraction.css'
import "../order/Order.css";

const schema = yup.object({
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    Name: yup.string().required("שדה זה חובה"),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
}).required();


const ManagerDetails = ({ onSubmit }) => {
    const user = useSelector(state => state.user);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const arr = [{ lableName: "שם בעל האטרקציה", name: "Name", type: "text" },
    { lableName: "מספר טלפון", name: "Phone", type: "text" },
    { lableName: "דואר אלקטרוני", name: "Email", type: "mail" }]
    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            <br/> <p>רגע לפני שמפרסמים את המודעה, נרצה להכיר אותך:</p> <br/>
            {arr.map(item => <FormInput
                lableName={item.labelName}
                name={item.name}
                type={item.type}
                errors={errors}
                register={register}
                user={user}
                flag={false} />)}
            <div className="creditCard">
                <p>אתר זה מכבד את הכרטיסים הבאים:</p>
                <img src="./images/creditCards.png" />
            </div>
            <br/>
            <Button variant="contained" size="medium" type="submit" style={{ color: "white", backgroundColor: "orange" }}>
                להמשיך לשלב הבא </Button>
        </form>
    )
}
export default ManagerDetails;