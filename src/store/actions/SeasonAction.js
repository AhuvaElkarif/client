import axios from "axios"

export const getSeasons = () => {
    return axios.get("http://localhost:57828/Api/season/Get");
}