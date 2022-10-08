import { OutlinedInput } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { useState } from "react";

const Password = ({errors, register, labelName, name}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="outlined-adornment-password">{labelName}</InputLabel>
        <OutlinedInput
            {...register(name)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="start">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshowPassword(!showPassword)}                            >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
        <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
    </FormControl>
    )
}
export default Password;