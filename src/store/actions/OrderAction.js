import axios from 'axios';

export const addOrder = (order) => {
    return axios.post("http://localhost:57828/Api/orderAttraction/Post", order);
}

export const deleteOrder = (order) => {
    return axios.delete("http://localhost:57828/Api/orderAttraction/Delete", order);
}