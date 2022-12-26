import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import * as yup from "yup";
import { useEffect, useState } from "react";
import FormInput from "../formInput/FormInput";
import { addAbout, deleteAbout, updateAbout } from "../../store/actions/AboutAction";
import AlertMessage from "../alert/AlertMessage";
import Alerts from "../alert/Alerts";
import { Button } from "@material-ui/core";

const schema = yup.object({
    HeaderText: yup.string().required("שדה זה חובה"),
    ContentText: yup.string().required("שדה זה חובה").max(1000, 'לא ניתן להכניס יותר מ-1000 תווים'),
}).required();
const AboutDetails = ({ item, type, arr, setArr }) => {
    const [flag, setFlag] = useState(false);
    const [text, setText] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => { }, [item])
    const delAbout = () => {
        deleteAbout(item.Id)
            .then(x => {
                setFlag(true);
                setText("נמחק בהצלחה!");
                const vec = arr.filter(x => x.Id != item.Id);
                setArr(vec);
            })
            .catch(err => alert('אנו מתנצלים קרתה תקלה זמנית הטקסט לא נמחק'));
    }
    const onSubmit = (data) => {
        if (type == "add"){
            data.Status=true;
            addAbout(data)
                .then(x => {
                    setFlag(true);
                    setText("התווסף בהצלחה!")
                })
                .catch(err => alert('אנו מתנצלים קרתה תקלה זמנית הטקסט לא עודכן'));
            }
        else {
            data.Id = item.Id;
            updateAbout(data)
                .then(x => {
                    setFlag(true);
                    setText("עודכן בהצלחה!")
                })
                .catch(err => alert('אנו מתנצלים קרתה תקלה זמנית הטקסט לא עודכן'));
        }


    }
    return type == "undefined" ? <><h4 style={{color:"orange"}}>{item.HeaderText}</h4> <p>{item.ContentText}</p> </> :
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                lableName={"כותרת"}
                name={"HeaderText"}
                type={"text"}
                errors={errors}
                register={register}
                user={item}
                flag={false} />
            <TextField
                id="outlined-multiline-static"
                variant='outlined'
                multiline
                minRows={7}
                {...register("ContentText")}
                style={{ width: "30rem" }}
                label="תיאור"
                defaultValue={item != null ? item.ContentText : ""}
            />
            <br /> <span style={{ color: "red" }}>{errors['ContentText']?.message}</span> <br />
            <Button style={{ backgroundColor: "orange" }} variant="contained" type="submit">{type == "add" ? "הוסף" : "עדכן"}</Button>
            {type != "add" && <Button style={{ backgroundColor: "orange" }} variant="contained" onClick={delAbout}>מחק</Button>}

            {flag && <AlertMessage
                variant={'success'}
                children={<Alerts message={text} />} setFlag={setFlag} />}
        </form>
}
export default AboutDetails;