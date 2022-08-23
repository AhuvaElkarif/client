import React from "react";
import { useForm } from "react-hook-form";

export default function P() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("Name", { required: true , minLength:2})} />
      {errors.Name?.type === 'required' && <p>זהו שדה חובה</p>}
      {errors.Name?.type === 'minLength' && <p>השם אינו תקין</p>}

       {errors.Name?console.log(errors.Name):null}
      <input {...register("Phone", { required: true,  minLength: 9, maxLength: 10  })} />
      {errors.Phone?.type === 'required' && <p>זהו שדה חובה</p>}
      {errors.Phone?.type === 'minLength' && <p>פלאפון חייב להכיל לפחות 9 ספרות</p>}

      <input {...register("Email", { required: "זהו שדה חובה" })} />
      <p>{errors.Email?.message}</p>
      
      <input {...register("Password", { required: "זהו שדה חובה" , pattern: /^[A-Za-z]+$/i})} />
      <p>{errors.Password?.message}</p>

      <input type="submit" />
    </form>
  );
}
