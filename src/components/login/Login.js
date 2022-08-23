import { login } from "../../store/actions/UserActions";
import { useNavigate } from "react-router";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useRef } from "react";
import "./Login.css";
import "../register/Register.css";
import * as React from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertMessage from "../usersList/AlertMessage";
import Alerts from "../alert/Alerts";

const Login = () => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const dispatch = useDispatch();
    // const { user } = useSelector(state => ({
    //     user: state.user
    // }, shallowEqual));

    let navigate = useNavigate();
    // let nameInput = useRef(null);
    // let passwordInput = useRef(null);
    let user = {}
    const change = (e) => {
        let { name, value } = e.target;
        user[name] = value;
    }

    const save = (e) => {
        e.preventDefault();
        dispatch(login(user));
    }

    return (<>
        <form className="location">
            <TextField id="standard-basic" label="שם משתמש" name="name" variant="standard" onChange={change} /><br /> <br />

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">סיסמא</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl> <br /> <br />
            <label> <input className="login" type="submit" value="התחבר" onClick={save} /> </label>
            <p className="move">לא רשום? עבור <span className="link" onClick={() => { navigate("/register"); }}> להרשמה </span></p>
        </form>
    </>)
}
export default Login;


