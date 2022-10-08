import axios from "axios";

export const getOpinions = () => {
    return axios.get("http://localhost:57828/Api/opinion/GetOpinions");
}

export const getNotActiveOpinions = () => {
    return axios.get("http://localhost:57828/Api/opinion/GetNotActiveOpinions");
}

export const getOpinionsByOpinionId = (id) => {
    return axios.get("http://localhost:57828/Api/opinion/getOpinionsByOpinionId?opinionId="+ id);
}

export const getOpinionsByAttrctionId = (attractionId) => {
    return axios.get("http://localhost:57828/Api/opinion/GetOpinionsByAttrctionId?attractionId="+ attractionId);
}

export const addOpinion = (opinion) => {
    return axios.post("http://localhost:57828/Api/opinion/Post", opinion);
}
export const changeStatus = (id, operation) => {
    return axios.put("http://localhost:57828/Api/report/ChangeStatus?reportId="+id+"&operation="+operation);
}
export const deleteOpinion = (id) => {
    return axios.delete("http://localhost:57828/Api/opinion/Delete?opinionId="+ id);
}