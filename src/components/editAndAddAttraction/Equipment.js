import { Button, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import './EditAttraction.css';
import { addEquipment, deleteEquipment, getEquipmentsByAttractionId, updateEquipment } from "../../store/actions/EquipmentAction";

const Equipment = ({ id, type, onSubmit }) => {
    const [arr, setArr] = useState([]);
    useEffect(() => {
        if (type == "new")
            setArr(new Array(15).fill(""));
        else
            getEquipmentsByAttractionId(id)
                .then(x => setArr([...x.data, "", "", "", "", "", "", "", "", ""]))
                .catch(err => console.log(err));
    }, [])
    const handleChange = (e, ind) => {
        const { value } = e.target;
        const copy = [...arr];
        if (copy == "")
            copy[ind] = { ...copy, AttractionId: id, Name: value };
        else
            copy[ind].Name = value;
        setArr(copy)
    }
    const handleClick = () => {
        if (type == "new") {
            const array = [...arr.filter(x => x.Name != undefined)];
            onSubmit(array);
            return;
        }
        const array = arr.filter(x => x.Id != undefined&& x.Name!='')
        updateEquipment(array)
            .then(x => console.log(x.data))
            .catch(err => console.log(err));
        const copy = arr.filter(x => x.Name != undefined && x.Id == undefined && x.Name != '');
        if (copy.length > 0)
            addEquipment(copy)
                .then(x => console.log(x.data))
                .catch(err => console.log(err));
        const copy2 = arr.filter(x => x.Id &&  x.Name == '');
        if (copy2.length > 0)
            deleteEquipment(copy2)
                .then(x => console.log(x.data))
                .catch(err => console.log(err));
        onSubmit();
        // const copy = arr.filter(x => x.Name != undefined && x.Id == undefined);
        // onSubmit({ arrAdd: copy, arrUpdate: array });
    }
    return (
        <div> <br />
            <h3>ציוד שחשוב ומומלץ להביא:</h3> <br />
            <ul className="equipmentAttraction">
                {arr.map((item, index) => {
                    return <li key={index} className="equipment-container">
                        <TextField id="outlined-basic" variant="outlined" size="small"
                            defaultValue={item != "" ? item.Name : null}
                            onChange={(e) => { handleChange(e, index) }} />
                    </li>
                })}
            </ul>
            <img src="../../images/equipment.jpg" className="equipment-img" />
            <Button variant="contained" size="medium" onClick={handleClick} style={{ color: "white", backgroundColor: "orange" }}> להמשיך לשלב הבא </Button>

        </div>
    )
}
export default Equipment;