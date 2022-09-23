import axios from "axios"

export const getReports = () =>{
    return axios.get("http://localhost:57828/Api/report/Get");
}

export const getKindReportByReportId = (id) =>{
    return axios.get("http://localhost:57828/Api/kindReport/GetkindReportByKindReportId?kindReportId= "+id);
}
export const getKindsReports = () => {
    return axios.get("http://localhost:57828/Api/kindReport/Get");
}

export const addReport = (report) => {
    return axios.post("http://localhost:57828/Api/report/Post", report);
}

export const deleteReport = (reportId) => {
    return axios.delete("http://localhost:57828/Api/report/Delete?reportId= "+ reportId);
}

