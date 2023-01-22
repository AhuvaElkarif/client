import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/actions/UserActions";
import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import Password from "../password/Password";
const arr = [
    { lableName: "שם משתמש", name: "Name", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
    { lableName: 'דוא"ל', name: "Email", type: "mail" },
    { lableName: "סיסמא", name: "Password", type: "text" },
];

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין')
        .max(10, 'מספר הפלאפון אינו תקין'),
    Password: yup.string().required("שדה זה חובה")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
}).required();

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(true);
    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    React.useEffect(() => { }, [user])

    // פונקצית הרשמה
    // הפונקציה מתבצעת במידה וכל הנתונים שהוזנו בשדות עונים לדרישות הסכמה
    const onSubmit = (data) => {
        data.Status = 1;
        data.Active = true;
        dispatch(addUser(data));
        setFlag(false);
        navigate("/attractionsList/" + 0);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            {arr.map(item => <div key={item.name}>
                {item.name != "Password" ? <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={user}
                    flag={false} /> :
                    <Password
                        errors={errors}
                        register={register}
                        name={"Password"}
                        labelName={"סיסמא"} />
                }
            </div>
            )}
            <Button variant="contained"
                size="medium"
                type="submit"
                style={{ backgroundColor: "orange" }}>
                הרשם
            </Button>
            <br /> <br />
            <p className="move">
                כבר רשום? עבור <span onClick={() => { navigate("/login/" + 0) }} >להתחברות</span>
            </p>
        </form>)
}
export default Register;