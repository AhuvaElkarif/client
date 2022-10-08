import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Register from '../register/Register';
import { useDispatch, useSelector } from 'react-redux';
import Password from '../password/Password';
import ForgetPassword from '../login/ForgetPassword';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from '@mui/material';
import { changePassword } from '../../store/actions/UserActions';
import UsersList from '../usersList/UsersList';
import swal from 'sweetalert';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ButtomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const schema = yup.object({
    Password: yup.string().required("שדה זה חובה").oneOf([user.Password],"סיסמא  שגויה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
    NewPassword: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    if(data.Password == data.NewPassword){
      swal("הסיסמאות זהות, לא נתבצע כל שינוי.");
       return;
    }
    dispatch(changePassword({ Password: data.NewPassword, Email: user.Email }));
    swal(user.Name + " פרטיך עודכנו בהצלחה!", "המשך גלישה מהנה!");
  }
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}>

        <BottomNavigationAction label="עדכון פרטים אישיים" icon={<PersonIcon />} />
        <BottomNavigationAction label="עדכון סיסמא" icon={<LockIcon />} />
      </BottomNavigation>
      {value == 0 ? <Register type={user.Status} /> :
        <form onSubmit={handleSubmit(onSubmit)}>
          <Password
          errors={errors}
          register={register}
          name="Password"
          labelName="סיסמא ישנה" />
          <br />
          <Password
            errors={errors}
            register={register}
            name="NewPassword"
            labelName="סיסמא חדשה" />
          <br />

          <p className="move" onClick={() => { setOpen(true) }}>שכחתי סיסמא</p>
          {open ? <ForgetPassword email={user.Email} setOpen={setOpen} /> : null}
          <Button variant='contained' type="submit">שמירת שינויים</Button>
        </form>}
    </div>
  );
}