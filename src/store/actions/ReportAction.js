import axios from "axios"

export const getKindsReports = () => {
    return axios.get("http://localhost:57828/Api/kindReport/Get");
}

export const addReport = (report) => {
    return axios.post("http://localhost:57828/Api/report/Post", report);
}