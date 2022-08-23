import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9,'מספר הפלאפון אינו תקין').max(10,'מספר הפלאפון אינו תקין'),
    Password: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ ,"סיסמא לא תקינה")
}).required();

const Input = ({ register, errors, name, lableName, type }) => {
    return <Fragment>
        <InputLabel>{lableName} </InputLabel>
        <input type={type} {...register(name)} />
        <p>{errors[name]?.message}</p>
    </Fragment>
}
const Select = React.forwardRef(({ onChange, onBlur, name, lableName, arr }, ref) => (
    <>
        <InputLabel>{lableName} </InputLabel>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            {arr.map(x => <option key={x.Id} value={x.Id}>{x.name}</option>)}
        </select>
    </>
));
export default function Test(){
  const { register, handleSubmit, formState: { errors },watch } = useForm({
      resolver: yupResolver(schema)
  });
  
  const onSubmit = data => console.log(data);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <Input lableName="שם פרטי" register={register} errors={errors} name="Name" />
          <Input lableName="מייל" register={register} errors={errors} name="Email" />
          <Input lableName="מספר פלאפון" register={register} errors={errors} name="Phone" />
          <Input lableName="סיסמא" register={register} errors={errors} name="Password" />
           
          <Select labelName="משתמשים" {...register("user")}  arr={[{ Id: 1, name: "sara" }, { Id: 2, name: "dvora" }]} />
          <Select labelName="צבעים" {...register("color")} arr={[{ Id: 1, name: "חנה" }, { Id: 2, name: "שששש" }]} />
          {console.log(errors)}

          <input type="submit" />
      </form>
  );
  }