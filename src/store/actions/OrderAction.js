import axios from 'axios';

export const addOrder = (order) => {
    return axios.post("http://localhost:57828/Api/orderAttraction/Post", order);
}
