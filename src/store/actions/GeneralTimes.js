import axios from "axios"

export const getTimesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/generalTime/getByAttractionId?attractionId=" + attractionId);
}