import * as React from "react";
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
import './EditAttraction.css';

const schema = yup.object({
    // Name: yup.string().required("שדה זה חובה"),
    // Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    // Description: yup.string().required("שדה זה חובה").max(1000, 'מספר תווים מקסימלי הוא 400'),
    // Address: yup.string().required("שדה זה חובה"),
    // Price: yup.string().required("שדה זה חובה"),
    // MinParticipant: yup.number().required("שדה זה חובה"),///.matches(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/),
    // MaxParticipant: yup.number().required("שדה זה חובה")//.matches(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/)
    //     .when('MinParticipant', (MinParticipant) => {
    //         if (MinParticipant) {
    //             return yup.number().required("שדה זה חובה")
    //                 .min(MinParticipant, 'מספר משתפים מקסימלי חייב להיות יותר גדול ממספר משתתפים מינימלי')
    //         }
    //     }),
    // IsAvailable: yup.string(),
    // TimeDuration: yup.string().required("שדה זה חובה"),
    // FromAge: yup.number().required("שדה זה חובה"),
    // TillAge: yup.number().required("שדה זה חובה")
    //     .when('FromAge', (FromAge) => {
    //         if (FromAge) {
    //             return yup.number().required("שדה זה חובה")
    //                 .min(FromAge, 'לא תקין')
    //         }
    //     }),
    // DaysToCancel: yup.string().required("שדה זה חובה"),
    // AreaId: yup.string().required("שדה זה חובה"),
}).required();
const arr = [
    { lableName: "שם אטרקציה", name: "Name", type: "text" },
    { lableName: "מחיר", name: "Price", type: "number" },
    { lableName: "מספר טלפון(מקום האטרציה)", name: "Phone", type: "text" },
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
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("grey");
    const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");

    useEffect(() => {
        if (attraction)
            handleChange({ target: { value: attraction.Description } })
        getAreas()
            .then(x => setAreas(x.data))
            .catch(err => alert("קרתה תקלה זמנית, אנו מתנצלים."))
        if (type == "new")
            attraction = null;
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleChange = ({ target }) => {
        const cnt = target.value.length;
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
            <div className="detailsAttraction">
                {arr.map(item => <div key={item.name} className="container-details">
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
                <div className="container-details">
                    {areas && <SelectForm
                        name={"AreaId"} defaultValue={attraction ? attraction.AreaId : null}
                        arr={areas} lableName={"בחר איזור"} {...register("AreaId")} errors={errors} />}
                </div>
            </div>
            <div>
                <h4>פרטים נוספים (עד 400 תווים) {count}/400</h4> <br />
                <span>{text}</span>
                <BorderLinearProgress
                    color1={color}
                    variant="determinate" value={count / 4} />
                <br/>
                <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    multiline
                    minRows={7}
                    {...register("Description")}
                    style={{ width: "30rem" }}
                    label="תיאור"
                    onChange={handleChange}
                    defaultValue={attraction ? attraction.Description : "זה המקום לציין את כל המידע לגבי האטרקציה כדי להתקדם לאטרקציה מעולה."}
                />
                <br /> <br />
                <p>*אין צורך להוסיף מספר טלפון כחלק מהתיאור, בהמשך התהליך יש אזור מסודר לזה.</p>
            </div>

            <br /> <br />
            <Button variant="contained" size="medium" type="submit" style={{ backgroundColor: "orange", color: "white" }}> להמשיך לשלב הבא </Button>
        </form>)
}
export default AttractionDetails;