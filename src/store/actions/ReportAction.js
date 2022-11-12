import axios from "axios"

export const getReports = () =>{
    return axios.get("http://localhost:57828/api/report/Get");
}

export const getKindReportByReportId = (id) =>{
    return axios.get("http://localhost:57828/api/kindReport/GetkindReportByKindReportId?kindReportId= "+id);
}
export const getKindsReports = () => {
    return axios.get("http://localhost:57828/api/kindReport/Get");
}

export const addReport = (report) => {
    return axios.post("http://localhost:57828/api/report/Post", report);
}

export const deleteReport = (reportId) => {
    return axios.delete("http://localhost:57828/api/report/Delete?reportId= "+ reportId);
}

export const addKindReport = (kindReport) => {
    return axios.post("http://localhost:57828/api/kindReport/Post", kindReport);
}

