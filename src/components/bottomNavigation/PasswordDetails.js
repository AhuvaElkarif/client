import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Password from '../password/Password';
import ForgetPassword from '../login/ForgetPassword';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from '@mui/material';
import { changePassword } from '../../store/actions/UserActions';
import AlertMessage from '../alert/AlertMessage';
import Alerts from '../alert/Alerts';
import swal from 'sweetalert';

export default function PasswordDetails() {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const schema = yup.object({
    Password: yup.string().required("שדה זה חובה").oneOf([user.Password], "סיסמא  שגויה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
    NewPassword: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => {
    if (data.Password == data.NewPassword) {
      swal("הסיסמאות זהות, לא נתבצע כל שינוי.");
      return;
    }
    dispatch(changePassword({ Password: data.NewPassword, Email: user.Email }));
    setFlag(true);
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="location">
    <p>סיסמא ישנה</p>
    <Password
      errors={errors}
      register={register}
      name="Password"
      labelName="סיסמא ישנה" />
    <br />

    <p>סיסמא חדשה</p>
    <Password
      errors={errors}
      register={register}
      name="NewPassword"
      labelName="סיסמא חדשה" />
    <br />

    <p className="move" onClick={() => { setOpen(true) }}>שכחתי סיסמא</p>
    {open ? <ForgetPassword email={user.Email} setOpen={setOpen} /> : null}
    <Button variant='contained' type="submit" style={{ backgroundColor: "orange" }}>שמירת שינויים</Button>
    {flag && <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"פרטיך עודכנו בהצלחה!"} />} />}

  </form>
}