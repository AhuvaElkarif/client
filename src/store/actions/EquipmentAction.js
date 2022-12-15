import axios from "axios";

export const getEquipmentsByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/equipment/GetEquipmentsByAttractionId?attractionId="+ attractionId);
}

export const addEquipment = (equipment) => {
    return axios.post("http://localhost:57828/api/equipment/Post",equipment);
}

export const updateEquipment = (arr) => {
    return axios.put("http://localhost:57828/api/equipment/Put", arr);
}