import axios from "axios"

export const getTimesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/Api/generalTimes/getTimesByAttractionId?attractionId=" + attractionId);
}