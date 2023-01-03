import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import './FormInput.css';
import React from "react";
const FormInput = ({ register, errors, name, lableName, type, flag, user }) => {
    return <>{type != "checkbox" ?<>
            {/* <InputLabel htmlFor="outlined-adornment-password" style={{position:"relative", left:"4rem", top:"2rem"}}>{lableName}</InputLabel> */}
        <TextField id="standard-basic" className='c1' label={lableName}  style={{backgroundColor:"#ebedf0", color:"orange"}}
            name={name} type={type} {...register(name)} variant="outlined"
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} />
       </> : <>  <FormControlLabel control={<Checkbox defaultChecked />} label={lableName} name={name} {...register(name)}
            disabled={flag == "true"} defaultValue={user != null ? user[name] : ""} /></>}
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </>

}
export default FormInput;