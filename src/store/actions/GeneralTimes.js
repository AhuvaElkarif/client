import axios from "axios"

export const getTimesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/generalTime/GetByAttractionId?attractionId=" + attractionId);
}
export const addGeneralTimes = (item) => {
    return axios.post("http://localhost:57828/api/generalTime/Post", item);
}

export const getGeneralTimesByPeriodId = (id) => {
    return axios.get("http://localhost:57828/api/generalTime/GetGeneralTimesByPeriodId?id=" + id);
}

export const updateGeneralTime = (item) => {
    return axios.put("http://localhost:57828/api/generalTime/Put", item);
}

export const deleteGeneralTime = (id) => {
    return axios.delete("http://localhost:57828/api/generalTime/Delete?generalTimeId=" + id);
}

