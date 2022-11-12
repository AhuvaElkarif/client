import axios from "axios";

export const getEquipmentsByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/equipment/GetEquipmentsByAttractionId?attractionId="+ attractionId);
}