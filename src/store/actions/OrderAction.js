import axios from 'axios';
import * as actionType from '../reducers/actionType';

export const getOrders = () => {
    return (dispatch) => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        axios.get("http://localhost:57828/api/orderAttraction/GetOrders")
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
export const getOrdersByUserId = (userId) => {
    return dispatch => {
        axios.get("http://localhost:57828/Api/orderAttraction/GetordersByUserId?userId="+userId)
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_ORDERS,
                    payload: response.data
                });
            })
            .catch(err => alert("קרתה תקלה זמנית באתר."))
    }
}
export const getOrdersByMangerId = (id) => {
    return dispatch => {
        axios.get("http://localhost:57828/Api/orderAttraction/GetordersByManagerId?managerId="+id)
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_ORDERS,
                    payload: response.data
                });
            })
            .catch(err => alert("קרתה תקלה זמנית באתר."))
    }
}

export const addOrder = (order) => {
    return axios.post("http://localhost:57828/api/orderAttraction/Post", order);
}

export const deleteOrder = (id) => {
    // return axios.delete("http://localhost:57828/api/orderAttraction/Delete", order);
    return dispatch => {
        axios.put("http://localhost:57828/Api/orderAttraction/ChangeOrderStaus?orderId="+id)
            .then(response => {
                dispatch({
                    type: actionType.ORDER_DELETED,
                    payload: id
                });
            })
            .catch(err => alert("קרתה תקלה זמנית באתר."+err))
    }
}

