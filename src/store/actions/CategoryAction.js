import axios from "axios";
import * as actionType from '../reducers/actionType';
export const getCategories = () => {
    return (dispatch) => {
        dispatch({
            type: actionType.SET_LOADING,
            payload: true
        });
        axios.get("http://localhost:57828/Api/category/Get")
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_CATEGORIES,
                    payload: response.data
                });
                dispatch({
                    type: actionType.SET_LOADING,
                    payload: false
                });
            })
            .catch(err => console.log(err))
    }
}

export const addCategory = (category) => {
    return (dispatch) => {
        axios.post("http://localhost:57828/Api/category/addcategory", category)
            .then(response => {
                dispatch({
                    type: actionType.CATEGORY_ADDED,
                    payload: response.data
                });
            })
            .catch(err => { console.log(err) })
    }
}

export const changeStatus = (category) => {
    return (dispatch) => {
        axios.put("http://localhost:57828/Api/category/ChangeStatus", category)
            .then(response => {
                dispatch({
                    type: actionType.CATEGORY_CHANGED,
                    payload: response.data
                });
            })
            .catch(err => { console.log(err) })
    }
}

export const getWaitingCategories = () => {
    return axios.get("http://localhost:57828/Api/category/GetWaitingCategory");
}