import TextField from '@mui/material/TextField';
import React from "react";
const FormInput = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>
        <TextField id="standard-basic" label={lableName}
            name={name} type={type} {...register(name)} variant="standard"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>
}
export default FormInput;