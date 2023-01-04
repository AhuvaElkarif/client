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
       return axios.get("http://localhost:57828/Api/orderAttraction/GetordersByManagerId?managerId="+id)
}

export const addOrder = (order) => {
    return axios.post("http://localhost:57828/api/orderAttraction/Post", order);
}

export const deleteOrder = (id) => {
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
export const deleteOrderAfterApproval = (id) => {
      return axios.put("http://localhost:57828/Api/orderAttraction/ChangeApproval?id="+id)
}

export const getDaysInMoth = (month, year, id,amount) => {
    return axios.get("http://localhost:57828/Api/orderAttraction/GetDaysInMonth?id="+id+"&month="+month+"&year="+year+"&amount="+amount);
}