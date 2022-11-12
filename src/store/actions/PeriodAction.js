import axios from "axios"

export const getPeriods = () => {
    return axios.get("http://localhost:57828/api/period/Get");
}