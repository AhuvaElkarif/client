import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/UserActions";
import Alerts from '../alert/Alerts';
import AlertMessage from '../alert/AlertMessage';
import "../register/Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
const arr = [
    { lableName: "שם משתמש", name: "Name", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
    { lableName: 'דוא"ל', name: "Email", type: "mail" },
]
const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
}).required();

const PersonalDetails = () => {
    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(false);
    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    React.useEffect(() => { }, [user])
    const onSubmit = (data) => {
        data.Status = user.Status;
        data.Active = true;
        data.Id = user.Id;
        data.Password = user.Password;
        dispatch(updateUser(data))
        setFlag(true);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            {arr.map(item => <div key={item.name}>
                 <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={user}
                    flag={false} />
            </div>
            )}
            <Button variant="contained" size="medium" type="submit" style={{ backgroundColor: "orange" }}>
                 שמירת שינויים
            </Button>
            <br /> <br />
            {flag && <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"פרטיך עודכנו בהצלחה!"} />} />}

        </form>)
}
export default PersonalDetails;