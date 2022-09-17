import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/actions/UserActions";
import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import swal from "sweetalert";

const Register = ({ id }) => {
    const navigate = useNavigate();
    const { type } = useParams();
    const [flag, setFlag] = React.useState(true);
    const dispatch = useDispatch();
    const schema = yup.object({
        Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
        Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
        Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית.")
    }).required();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        swal(data.Name + " ברוך הבא!", "נרשמת בהצלחה");
        if (type == 2)
            data.Status = 2;
        else
            data.Status = 1;
        data.Active = true;
        setFlag(false);
        dispatch(addUser(data));
        if (type == 3)
            navigate("./report/" + id);
        else
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
        {type == 2 ? <h1>כניסת מעסיקים</h1> : null}
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            <FormInput lableName="שם משתמש" name="Name" type="text" errors={errors} register={register} user={null} flag={false} />
            <FormInput lableName="מספר פלאפון" name="Phone" type="text" errors={errors} register={register} user={null} flag={false} />

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
                <span style={{ color: "red" }}>{errors.Password?.message}</span> <br />
            </FormControl>
            <FormInput lableName="מייל" name="Email" type="mail" errors={errors} register={register} user={null} flag={false} />

            {/* {!flag && <AlertMessage variant={'success'} children={<Alerts message={"נרשמת בהצלחה!"} />} />} */}
            <Button variant="contained" size="medium" type="submit">  הרשם  </Button>
            {type != 3 && <p className="move">כבר רשום? עבור <span onClick={() => { navigate("/login/" + type) }} >להתחברות</span></p>}
        </form>

    </>)
}
export default Register;