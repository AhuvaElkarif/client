import axios from 'axios';
import * as actionType from '../reducers/actionType';

export const getOrders = () => {
    return (dispatch) => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        axios.get("http://localhost:57828/Api/orderAttraction/GetOrders")
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_ORDERS,
                    payload: response.data
                });
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            })
            .catch(err => console.log(err))
    }
}

export const addOrder = (order) => {
    return axios.post("http://localhost:57828/Api/orderAttraction/Post", order);
}

export const deleteOrder = (order) => {
    return axios.delete("http://localhost:57828/Api/orderAttraction/Delete", order);
}

