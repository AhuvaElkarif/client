import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const schema = yup.object({
    firstName: yup.string().required("חובה"),
    // mail: yup.string().email("כתובת מייל תקינה").required(),
    // age: yup.number().positive().integer().required(),
}).required();

const Input = ({ register, errors, name, lableName, type }) => {
    return <Fragment>
        <InputLabel>{lableName} </InputLabel>
        <input type={type} {...register(name)} />
        <p>{errors[name]?.message}</p>
    </Fragment>
}

// export default function App() {
    export default function Test(){
    const { register, handleSubmit, formState: { errors },watch } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input lableName="שם פר" register={register} errors={errors} name="firstName" />
            <Input lableName="מייל" register={register} errors={errors} name="mail" />
            <Input lableName="גיל" register={register} errors={errors} name="age" />
            {console.log(errors)}

            <input type="submit" />
        </form>
    );
    }