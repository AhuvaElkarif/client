import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../formInput/FormInput";
import { getAreas } from "../../store/actions/AreaAction";
import { Button, TextField } from "@material-ui/core";
import './EditAttraction.css'
import BorderLinearProgress from "./BorderLinearProgress";
import SelectForm from "../attractionsList/SelectForm";
const schema = yup.object({
    Name: yup.string().required("שדה זה חובה"),
    // Description: yup.string().required("שדה זה חובה").max(400, 'מספר תווים מקסימלי הוא 400'),
    // Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    // Address: yup.string().required("שדה זה חובה"),
    // Price: yup.string().required("שדה זה חובה"),
    // MinParticipant: yup.string().required("שדה זה חובה"),
    // MaxParticipant: yup.string().required("שדה זה חובה").matches(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/),
    // IsAvailable: yup.string().required("שדה זה חובה"),
    // TimeDuration: yup.string().required("שדה זה חובה"),
    // FromAge: yup.string().required("שדה זה חובה"),
    // TillAge: yup.string().required("שדה זה חובה"),
    // DaysToCancel: yup.string().required("שדה זה חובה"),
    // AreaId: yup.string().required("שדה זה חובה"),
}).required();
const arr = [
    { lableName: "שם אטרקציה", name: "Name", type: "text" },
    { lableName: "מחיר", name: "Price", type: "number" },
    { lableName: "כתובת", name: "Address", type: "text" },
    { lableName: "מספר משתתפים מינימלי", name: "MinParticipant", type: "number" },
    { lableName: "מספר משתתפים מקסימלי", name: "MaxParticipant", type: "number" },
    { lableName: "משך זמן האטרקציה (בדקות)", name: "TimeDuration", type: "number" },
    { lableName: "מגיל(כולל)", name: "FromAge", type: "number" },
    { lableName: "עד גיל(כולל)", name: "TillAge", type: "number" },
    { lableName: "מספר ימים לביטול", name: "DaysToCancel", type: "number" },
    { lableName: "האטרקציה זמינה כעת", name: "IsAvailable", type: "checkbox" },
]

const AttractionDetails = ({ type, attraction, onSubmit }) => {
    const [areas, setAreas] = useState(null);
    const [area, setArea] = useState(null);
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("grey");
    const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");

    useEffect(() => {
        getAreas()
            .then(x => setAreas(x.data))
            .catch(err => alert("קרתה תקלה זמנית, אנו מתנצלים."))
        if (type == "new")
            attraction = null;
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleChange = (e) => {
        const cnt = e.target.value.length;
        setCount(cnt);
        switch (true) {
            case cnt >= 1 && cnt < 50:
                setColor("red");
                setText("מרגיש לנו שהתיאור שכתבת קצר מידי")
                break;
            case cnt >= 50 && cnt < 150:
                setColor("orange");
                setText("יופי, המודעה הולכת לכיוון הנכון");
                break;
            case cnt >= 150 && cnt < 250:
                setColor("yellow");
                setText("עוד ממש קצת וזה שם");
                break;
            case cnt >= 250 && cnt < 350:
                setColor("light-green");
                setText("אוטוטו");
                break;
            case cnt >= 350:
                setColor("green");
                setText("בול!");
                break;
            default:
                setColor("grey");
                setText(" ממליצים לך בחום להוסיף תיאור נרחב ")
                break;
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {arr.map(item => <div key={item.name}>
                <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={attraction}
                    flag={false} />
            </div>
            )}
            <div>
                <p>פרטים נוספים(עד 400 תווים)</p>
                <div className="rating" style={{ backgroundColor: color }}>{text}</div> <span>{count}/400</span>
                <BorderLinearProgress
                    count={count}
                   variant="determinate" value={count / 4} />
                <span>{count}/400</span>
                <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    multiline
                    minRows={7}
                    {...register("Description")}
                    fullWidth
                    label="תיאור"
                    onChange={handleChange}

                    placeholder="זה המקום לציין את כל המידע לגבי האטרקציה כדי להתקדם לאטרקציה מעולה."
                />
                <p>אין צורך להוסיף מספר טלפון כחלק מהתיאור, בהמשך התהליך יש אזור מסודר לזה.</p>
            </div>

            {areas && <SelectForm
                // handleChange={({ target }) => { setArea(target.value) }}
                name={"AreaId"}
                arr={areas} lableName={"בחר איזור"} {...register("AreaId")} errors={errors} />}
            <Button variant="contained" size="medium" type="submit"> להמשיך לשלב הבא </Button>
        </form>
    )
}
export default AttractionDetails;