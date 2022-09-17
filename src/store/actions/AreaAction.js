import axios from "axios"

export const getAreas = () => {
   return axios.get("http://localhost:57828/Api/area/Get");
}