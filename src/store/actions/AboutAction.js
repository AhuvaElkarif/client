import axios from "axios"

export const getAbout = () => {
   return axios.get("http://localhost:57828/Api/about/Get");
}

export const updateAbout = (data) => {
    return axios.put("http://localhost:57828/Api/about/Put", data);
 }
 export const addAbout = (data) => {
    return axios.post("http://localhost:57828/Api/about/Post", data);
 }
 export const deleteAbout = (id) => {
    return axios.put("http://localhost:57828/api/about/change?id="+ id);
 }