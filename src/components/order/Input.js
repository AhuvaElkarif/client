import React, { Fragment } from "react";
import * as yup from "yup";
import TextField from '@mui/material/TextField';

const Input = ({ register, errors, name, lableName, type, product, flag, user }) => {
    return <>
        <TextField id="standard-basic" label={lableName}
            name={name} type={type} {...register(name)} variant="standard"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}
export default Input;
