import React, { Fragment } from "react";
import TextField from '@mui/material/TextField';

const Input = ({ register, errors, name, lableName, type, product, flag, user }) => {
    return <Fragment>
        <TextField id="standard-basic"
            label={lableName}
            name={name}
            type={type}
            {...register(name)}
            variant="standard"
            disabled={flag == "true"}
            defaultValue={user ? user[name] : ""} />
            
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </Fragment>
}
export default Input;
