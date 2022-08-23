import { connect } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

const EditAttraction = ({ type }) => {
    const { id } = useParams();

    let [item, setItem] = useState({ name: "", description: "", address: "", price: 0, minParticipant: 0, maxParticipant: 0, isAvailable: false, timeDuration: 0, fromAge: 0, tillAge: 0, daysToCancel: 0, date: new Date(), categoryId: 0 });
    useEffect(() => {
        const fakeItem = { name: "", description: "", address: "", price: 0, minParticipant: 0, maxParticipant: 0, isAvailable: false, timeDuration: 0, fromAge: 0, tillAge: 0, daysToCancel: 0, date: new Date(), categoryId: 0 }
        setItem(fakeItem);
    }, [])

    const change = (e) => {
        let { name, type, value } = e.target;
        if (type == "number")
            value = +value;
        if (type == "checkbox") {
            console.log(value)
            item[name] = e.target.checked;
        }
        else
            item[name] = value;
    }
    //  status,  categoryId
    return (
        <form>
            <label><input type="text" name="name" placeholder="שם אטרקציה" value={item.name} onChange={change} /> </label><br /><br />
            <label><input type="text" name="description" placeholder="תיאור" defaultValue={item.description} onChange={change} /></label> <br /><br />
            <label><input type="text" name="address" placeholder="כתובת" defaultValue={item.address} onChange={change} /></label> <br /><br />
            <label><input type="folder" name="image" placeholder="תמונה" defaultValue={item.image} onChange={change} /></label> <br /><br />
            <label><input type="number" name="price" placeholder="מחיר" defaultValue={item.price} onChange={change} /></label> <br /><br />
            <label><input type="number" name="minParticipant" placeholder="מחיר" defaultValue={item.minParticipant} onChange={change} /></label> <br /><br />
            <label><input type="number" name="maxParticipant" placeholder="מחיר" defaultValue={item.maxParticipant} onChange={change} /></label> <br /><br />
            <label><input type="number" name="timeDuration" placeholder="משך זמן(בדקות)" defaultValue={item.timeDuration} onChange={change} /></label> <br /><br />
            <label><input type="number" name="fromAge" placeholder="מגיל" defaultValue={item.fromAge} onChange={change} /></label> <br /><br />
            <label><input type="number" name="tillAge" placeholder="עד גיל" defaultValue={item.tillAge} onChange={change} /></label> <br /><br />
            <label><input type="date" name="daysToCancel" placeholder="מספר ימים לביטול" defaultValue={item.daysToCancel} onChange={change} /></label> <br /><br />
            <input type="checkbox" name="isAvailable" defaultChecked={item.isAvailable} onChange={change} /><span className="myP">פעיל</span> <br /><br />
            {type == "edit" ? <label><input type="submit" value="עדכן" /></label> : <label><input type="submit" value="הוסף" /></label>}

        </form>
    )
}
export default EditAttraction;