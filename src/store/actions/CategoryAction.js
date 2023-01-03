import axios from "axios";
import * as actionType from '../reducers/actionType';
export const getCategories = () => {
    return (dispatch) => {
        dispatch({
            type: actionType.SET_LOADING,
            payload: true
        });
        axios.get("http://localhost:57828/api/category/Get")
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
     return axios.post("http://localhost:57828/api/category/addcategory", category)
}
export const changeStatus = (category) => {
    return (dispatch) => {
        console.log(category)
        axios.put("http://localhost:57828/Api/category/ChangeStatus", category)
            .then(response => {
                dispatch({
                    type: actionType.CATEGORY_CHANGED,
                    payload: response.data
                });
            })
            .catch(err =>  console.log(err) )
    }
}
export const deleteCategory = (category) => {
    return (dispatch) => {
        axios.delete("http://localhost:57828/api/category/Delete?id="+ category.Id)
            .then(response => {
                dispatch({
                    type: actionType.DELETE_CATEGORY,
                    payload: category
                });
            })
            .catch(err => { console.log(err) })
    }
}

export const getWaitingCategories = () => {
    return axios.get("http://localhost:57828/api/category/GetWaitingCategory");
}