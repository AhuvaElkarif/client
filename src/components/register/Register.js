import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../store/actions/UserActions";
import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import swal from "sweetalert";
import Password from "../password/Password";
const arr = [
    { lableName: "שם משתמש", name: "Name", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
    { lableName: 'דוא"ל', name: "Email", type: "mail" },
    { lableName: "סיסמא", name: "Password", type: "text" },
]
const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
    NewPassword: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
}).required();

const Register = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { type } = useParams();
    const [flag, setFlag] = React.useState(true);
    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        data.Status = type == 2 ? 2 : 1;
        data.Active = true;
        // if (user) {
        //     data.Id=user.Id;
        //     swal(data.Name + " פרטיך עודכנו בהצלחה!", "המשך גלישה מהנה!");
        //     dispatch(updateUser(data))
        // }
        // else {
            swal(data.Name + " ברוך הבא!", "נרשמת בהצלחה");
            dispatch(addUser(data));
        // }
        setFlag(false);
        if (type == 3)
            navigate("./report/" + id);
        else
            navigate("/attractionsList/"+0);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location">
        {type == 2 ? <h1>הרשמת מעסיקים</h1> : null}
<br/> <br/>
            {arr.map(item => <div key={item.name}>
                {item.name != "Password" ? <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={null}
                    flag={false} /> : !user ?
                    <Password
                        errors={errors}
                        register={register}
                        name={"Password"}
                        labelName={"סיסמא ישנה"} /> : null
                }
                <br /> <br />
            </div>
            )}
            <Button variant="contained" size="medium" type="submit">
                {/* {user ? "שמירת שינויים" : "הרשם"} */} הרשם
            </Button>

            {type != 3 && !user && <p className="move">כבר רשום? עבור <span onClick={() => { navigate("/login/" + type) }} >להתחברות</span></p>}
            {/* {!flag && <AlertMessage variant={'success'} children={<Alerts message={"נרשמת בהצלחה!"} />} />} */}

        </form>)
}
export default Register;