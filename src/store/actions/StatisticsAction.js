import axios from "axios"

export const getPolpularAttractionsInLastYear = () => {
    return axios.get("http://localhost:57828/Api/attraction/GetPolpularAttractionsInLastYear")
}