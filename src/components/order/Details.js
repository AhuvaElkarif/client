import { useEffect, useState } from "react";
import EquipmentList from "../equipment/EquipmentList";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import * as yup from "yup";
import "./Order.css";
import { Button } from "@material-ui/core";
import FormInput from "../formInput/FormInput";
const arr = [
    { lableName: "שם", name: "Name", type: "text" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
    { lableName: 'דוא"ל', name: "Email", type: "mail" },
];

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
}).required();

const Details = ({ price, onSubmit, type, id }) => {
    const [showList, setShowList] = useState(false);
    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { user }
    });
    useEffect(() => {
        if (user) {
            arr.forEach(x => setValue(x.name, user[x.name]))
        }
    }, [user]);



    return (<div style={{ marginTop: "3rem", textAlign: "right", marginRight: "3rem", marginLeft: "3rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            {arr.map(item => <div key={item.name}>
                <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    flag={user}
                    width={"20vw"} />
            </div>
            )}
            <TextField id="outlined-multiline-flexible"
                style={{ width: "20vw", backgroundColor: "#ebedf0" }}
                multiline label="סכום לתשלום"
                disabled="true" value={price} />
            <br />
            {user && <p>*במידה והינך רוצה לשנות את פרטי המזמין יש לערוך את הפרופיל באיזור האישי.</p>}<br />

            <p onClick={() => setShowList(!showList)} className="link" >רשימת ציוד</p>
            {showList ? <EquipmentList id={id} /> : null} <br />

            <Button variant="contained"
                size="medium"
                type="submit"
                style={{ backgroundColor: "orange", color: "white" }}>
                {type == 0 ? "בצע הזמנה" : "עדכן הזמנה"}  </Button>
        </form> <br />

        <div className="creditCard">
            <p>אתר זה מכבד את הכרטיסים הבאים:</p>
            <img src="../../images/creditCards.png" />
        </div>
    </div>
    )

}
export default Details;