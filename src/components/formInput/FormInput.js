import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Fragment } from "react";
const FormInput = ({ register, errors, name, lableName, type, flag, width }) => {
    return <Fragment> {type != "checkbox" ? <Fragment>
        <TextField id="standard-basic"
            label={lableName}
            name={name}
            type={type}
            {...register(name)}
            variant="outlined"
            disabled={flag}
            style={{ backgroundColor: "#ebedf0", width: width ? width : null }} />
    </Fragment> :
        <Fragment>
            <FormControlLabel
                label={lableName}
                name={name}
                {...register(name)}
                disabled={flag}
                control={<Checkbox defaultChecked />} />
        </Fragment>}
        <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </Fragment>
}
export default FormInput;