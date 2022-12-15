import axios from "axios"

export const getPeriods = () => {
    return axios.get("http://localhost:57828/api/period/Get");
}

export const addPeriod = (period) => {
    return axios.post("http://localhost:57828/api/period/Post",period);
}

export const getPeriodByAttractionId = (id) => {
    return axios.get("http://localhost:57828/api/period/GetPeriodByAttractionId?attractionId="+ id);
}
export const updatePeriod = (period) => {
    return axios.put("http://localhost:57828/api/period/Put", period);
}