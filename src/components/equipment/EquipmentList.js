import React, { useEffect, useState } from 'react';
import { getEquipmentsByAttractionId } from '../../store/actions/EquipmentAction';

function EquipmentList({ id }) {
    let [equipment, setEquipment] = useState([]);
    useEffect(() => {
        getEquipmentsByAttractionId(id)
            .then(x => setEquipment(x.data))
            .catch(err => console.log(err));
    }, [id])
    return (<>
        {equipment != null ? <ul>
            {equipment.map(item => <li key={item.Id}> {item.Name} </li>)}
        </ul> : null}
    </>);
}

export default EquipmentList;