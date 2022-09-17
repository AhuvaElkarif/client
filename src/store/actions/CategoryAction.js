import axios from "axios";

export const getCategories = () => {
    return axios.get("http://localhost:57828/Api/category/Get");
}