import { currentUser, login } from "../../store/actions/UserActions";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import "../register/Register.css";
import * as React from "react";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, OutlinedInput } from "@material-ui/core";
import ForgetPassword from "./ForgetPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";
import { Divider } from "@mui/material";
import swal from "sweetalert";

const schema = yup.object({
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "סיסמא לא תקינה, יש להזין לפחות 6 ספרות אות אחת האנגלית וספרה.")
}).required();

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { type } = useParams();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [showPassword, setshowPassword] = React.useState(false)
    const { user } = useSelector(state => ({ user: state.user }))
    useEffect(() => {
        if (user) {
            if (type == 2)
                navigate("/editAttraction")
            else
                if (user.Status === 2)
                    navigate("/attractionsList/" + 2);
                else
                    navigate("/attractionsList/" + 0);
        }
    }, [user])

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        login(data)
            .then(response => {
                if (response.data != null) {
                    if (response.data.Active) {
                        dispatch(currentUser(response.data));
                    }
                }
                else
                    swal({
                        title: "כתובת המייל או הסיסמא שגויים!",
                        icon: "warning",
                        button: "אישור",
                    });
            })
            .catch(err => console.log(err))
    };
    const openReset = () => {
        setMail(getValues('Email'))
        setOpen(true)
    }


    return <form onSubmit={handleSubmit(onSubmit)} className="location">
        <h2>היי, טוב לראות אותך</h2> <br />
        <TextField id="standard-basic" label="אימייל" name="Email"
            style={{ backgroundColor: "#ebedf0" }}
            variant="outlined"  {...register("Email")} /><br />
        <span style={{ color: "red" }}>{errors.Email?.message}</span> <br />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="outlined-adornment-password" style={{ position: "relative", left: "4rem", top: "1.2rem" }}>סיסמא</InputLabel>
            <OutlinedInput
                {...register("Password")}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                style={{ backgroundColor: "#ebedf0" }}
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
        <Button variant="contained" size="medium" type="submit" style={{ color: "white", backgroundColor: "orange" }}>  התחבר  </Button>
        <br /> <br />
        <Divider style={{ width: "30vw", color: "black", position: "relative", left: "2rem" }} /> <br />
        <p className="move" onClick={openReset}>שכחתי סיסמא</p>

        {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}
        <p className="move"> לא רשום? עבור <span className="link" onClick={() => { navigate("/register"); }}> להרשמה </span></p>
        <br />
    </form>
}
export default Login;


