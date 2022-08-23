import React from "react";
import { useForm } from "react-hook-form";

export default function UseFor() {
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const onSubmit = async data => { console.log(data); };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("Name", { required: "בבקשה הכנס שם משתמש" })} // custom message
      />
      
       <input
        {...register("Password", { required: "בבקשב הכנס סיסמא " })} // custom message
      />
      <input type="submit" />
    </form>
  );
}