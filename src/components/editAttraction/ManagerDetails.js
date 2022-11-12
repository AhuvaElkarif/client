import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import { Button } from "@material-ui/core";
import './EditAttraction.css'

const schema = yup.object({
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    Name: yup.string().required("שדה זה חובה"),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
}).required();

const ManagerDetails = ({ attraction, onSubmit }) => {
    const  user = useSelector(state => state.user);
    useEffect(() => {

    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>רגע לפני שמפרסמים את המודעה, נרצה להכיר אותך</p>
            <FormInput
                lableName={"שם בעל האטרקציה"}
                name={"Name"}
                type={"text"}
                errors={errors}
                register={register}
                user={user}
                flag={false} />

            <FormInput
                lableName={"מספר טלפון"}
                name={"Phone"}
                type={"number"}
                errors={errors}
                register={register}
                user={attraction}
                flag={false} />

            <FormInput
                lableName={"דואר אלקטרוני"}
                name={"Email"}
                type={"mail"}
                errors={errors}
                register={register}
                user={user}
                flag={false} />

            <Button variant="contained" size="medium" type="submit"> להמשיך לשלב הבא </Button>
        </form>
    )
}
export default ManagerDetails;