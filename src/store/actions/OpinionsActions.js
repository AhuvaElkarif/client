import axios from "axios";

export const getOpinions = () => {
    return axios.get("http://localhost:57828/Api/opinion/GetOpinions");
}

export const getOpinionsByAttrctionId = (attractionId) => {
    return axios.get("http://localhost:57828/Api/opinion/GetOpinionsByAttrctionId?attractionId="+ attractionId);
}

export const addOpinion = (opinion) => {
    return axios.post("http://localhost:57828/Api/opinion/Post", opinion);
}
