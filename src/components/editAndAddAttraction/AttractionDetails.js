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
import MapWithAMarkerClustered from '../map/Map';
import './EditAttraction.css';

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה"),
    Phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    Description: yup.string().max(1000, 'מספר תווים מקסימלי הוא 1000'),
    Address: yup.string().required("שדה זה חובה"),
    Price: yup.number().min(0,'מחיר לא תקין').typeError("שדה זה חובה").required("שדה זה חובה"),
    MinParticipant: yup.number().positive('מספר לא תקין').typeError("שדה זה חובה").required("שדה זה חובה"),///.matches(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/),
    MaxParticipant: yup.number().positive('מספר לא תקין').typeError("שדה זה חובה").required("שדה זה חובה")//.matches(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/)
        .when('MinParticipant', (MinParticipant) => {
            if (MinParticipant) {
                return yup.number().typeError("שדה זה חובה").required("שדה זה חובה").positive('מספר לא תקין')
                    .min(MinParticipant, 'מספר משתפים מקסימלי חייב להיות יותר גדול ממספר משתתפים מינימלי')
            }
        }),
    TimeDuration: yup.number().positive('מספר לא תקין').typeError("שדה זה חובה").required("שדה זה חובה"),
    FromAge: yup.number().typeError("שדה זה חובה").required("שדה זה חובה").min(0, 'גיל לא תקין'),
    TillAge: yup.number().typeError("שדה זה חובה").required("שדה זה חובה").min(0, 'גיל לא תקין')
        .when('FromAge', (FromAge) => {
            if (FromAge) {
                return yup.number().typeError("שדה זה חובה").required("שדה זה חובה").min(0, 'גיל לא תקין')
                    .min(FromAge, 'לא תקין')
            }
        }),
    DaysToCancel: yup.string().required("שדה זה חובה"),
    AreaId: yup.string(),
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
]

const AttractionDetails = ({ type, attraction, onSubmit }) => {
    const [areas, setAreas] = useState(null);
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("grey");
    const [lat, setLat] = useState(type == "edit" ? attraction.lat : null);
    const [lng, setLng] = useState(type == "edit" ? attraction.lng : null);
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

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { attraction }
    });

    useEffect(() => {
        if (attraction) {
            arr.forEach(x => setValue(x.name, attraction[x.name]))
        }
    }, [attraction]);

    const handleChange = ({ target }) => {
        const cnt = target.value.length;
        setCount(cnt);
        switch (true) {
            case cnt >= 1 && cnt < 250:
                setColor("red");
                setText("מרגיש לנו שהתיאור שכתבת קצר מידי")
                break;
            case cnt >= 250 && cnt < 500:
                setColor("orange");
                setText("יופי, המודעה הולכת לכיוון הנכון");
                break;
            case cnt >= 500 && cnt < 750:
                setColor("yellow");
                setText("עוד ממש קצת וזה שם");
                break;
            case cnt >= 750 && cnt < 1000:
                setColor("light-green");
                setText("אוטוטו");
                break;
            case cnt >= 1000:
                setColor("green");
                setText("בול!");
                break;
            default:
                setColor("grey");
                setText(" ממליצים לך בחום להוסיף תיאור נרחב ")
                break;
        }
    }

    const onSubmit2 = (data) => {
        data.lng = lng;
        data.lat = lat;
        onSubmit(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit2)}>
            <div className="detailsAttraction">
                {arr.map(item => <div key={item.name} className="container-details2">
                    <FormInput
                        lableName={item.lableName}
                        name={item.name}
                        type={item.type}
                        errors={errors}
                        register={register}
                        flag={false} /> <br/>
                </div>
                )}
                <div className="container-details2">
                    {areas && <SelectForm
                        name={"AreaId"} defaultValue={attraction ? attraction.AreaId : null}
                        arr={areas} lableName={"בחר איזור"} {...register("AreaId")} errors={errors} />}
                </div> <br/>
            </div>

            <div>
                <h4>פרטים נוספים (עד 1000 תווים) {count}/1000</h4> <br />
                <span>{text}</span>
                <BorderLinearProgress
                    color1={color}
                    variant="determinate" value={count / 10} />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    multiline
                    minRows={7}
                    inputProps={{ maxLength: 1000 }}
                    {...register("Description")}
                    style={{ width: "32rem" }}
                    label="תיאור"
                    onChange={handleChange}
                    defaultValue={attraction ? attraction.Description : "זה המקום לציין את כל המידע לגבי האטרקציה כדי להתקדם לאטרקציה מעולה."}
                />
            </div>

            <h4> בחר מיקום במפה </h4> <br />
            <MapWithAMarkerClustered type={1} lat={lat} lng={lng} setLat={setLat} setLng={setLng} />

            <br /> <br />
            <Button variant="contained"
                size="medium" type="submit"
                style={{ backgroundColor: "orange", color: "white" }}>
                להמשיך לשלב הבא </Button>
        </form>)
}
export default AttractionDetails;