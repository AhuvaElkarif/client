import { useNavigate } from "react-router";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addUser } from "../../store/actions/UserActions";
import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertMessage from "../usersList/AlertMessage";
import Alerts from "../alert/Alerts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const Register = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = React.useState(true);
    const dispatch = useDispatch();
    const { user } = useSelector(state => {
        return {
            user: state.user,
        }
    }, shallowEqual);
    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9,'מספר הפלאפון אינו תקין').max(10,'מספר הפלאפון אינו תקין'),
        Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ ,"סיסמא לא תקינה")
    }).required();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (data) => {
        // web master
        if (user.Status == 3)
            data.Status = 2;
        else
            data.Status = 1;
        setFlag(false);
        dispatch(addUser(data));
        navigate("/attractionsList");
    };
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


    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            <TextField id="standard-basic" label="שם משתמש" name="Name" type="text" variant="standard" {...register("Name")} />
            <br/><span style={{color:"red"}}>{errors.Name?.message}</span>

            <br /> 
            <TextField id="standard-basic" label="מספר פלאפון" variant="standard" {...register("Phone")} />
            <br/><span style={{color:"red"}}>{errors.Phone?.message}</span>

            <br /> 
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">סיסמא</InputLabel>
                <Input
                    {...register("Password")}
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
                   <span style={{color:"red"}}>{errors.Password?.message}</span> <br/>
            </FormControl>

            <TextField id="standard-basic" label="מייל" variant="standard" {...register("Email")} />
            <br/><span style={{color:"red"}}>{errors.Email?.message}</span>
            <br />

            {user != null && user.Status == 3 ? <>{flag && <Button variant="contained" size="medium" type="submit">  הוסף  </Button>}
            {!flag && <AlertMessage variant={'success'} children={<Alerts message={"המשתמש התווסף בהצלחה!"} />} />}
            </> :
                <>
                    <Button variant="contained" size="medium" type="submit">  הרשם  </Button>
                    <p className="move">כבר רשום? עבור <span onClick={() => { navigate("/login") }} >להתחברות</span></p></>}
        </form>

    </>)
}
export default Register;