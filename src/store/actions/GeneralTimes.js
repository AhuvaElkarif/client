import axios from "axios"

export const getTimesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/generalTime/getByAttractionId?attractionId=" + attractionId);
}
export const addGeneralTimes = (item) => {
    return axios.post("http://localhost:57828/api/generalTime/Post", item);
}

export const getGeneralTimesByPeriodId = (id) => {
    return axios.get("http://localhost:57828/api/generalTime/GetGeneralTimesByPeriodId?id="+ id);
}

