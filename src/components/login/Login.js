import { login } from "../../store/actions/UserActions";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import "../register/Register.css";
import * as React from "react";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "@material-ui/core";
import ForgetPassword from "./ForgetPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object({
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "סיסמא לא תקינה, יש להזין לפחות 6 ספרות אות אחת האנגלית וספרה.")
}).required();

const Login = ({ type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [showPassword, setshowPassword] = React.useState(false)
    const { user } = useSelector(state => ({ user: state.user }))
    useEffect(() => {
        console.log(user)
        if (user!=null) {
            navigate("/attractionsList");
        }
    }, [user])

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
         dispatch(login(data, type));
    };
    const openReset = () => {
        setMail(getValues('Email'))
        setOpen(true)
    }


    return (<>
        {type == 2 ? <h1>כניסת מעסיקים</h1> : null}
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            <TextField id="standard-basic" label="אימייל" name="Email"
                variant="standard"  {...register("Email")} /><br/>
            <span style={{ color: "red" }}>{errors.Email?.message}</span> <br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">סיסמא</InputLabel>
                <Input
                    {...register("Password")}
                    id="standard-adornment-password"
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
                <span style={{ color: "red" }}>{errors.Password?.message}</span> <br />
            </FormControl>

            <br /> <br />
            <Button variant="contained" size="medium" type="submit">  התחבר  </Button>
            <p className="move" onClick={openReset}>שכחתי סיסמא</p>

            {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}
            {type != 3 && <p className="move">לא רשום? עבור <span className="link" onClick={() => { navigate("/register/" + type); }}> להרשמה </span></p>}
        </form>
    </>)
}
export default Login;


