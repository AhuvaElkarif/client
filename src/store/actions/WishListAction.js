import axios from "axios";
import * as actionType from '../reducers/actionType';

export const getWishList = (userId) => {
    return dispatch => {
        axios.get("http://localhost:57828/api/wish/GetWishesByUserId?userId=" + userId)
            .then(response => {
                dispatch({
                    type: actionType.WISH_LIST_ACCEPTED,
                    payload: response.data
                });
            })
            .catch(err => console.log(err))
    }
}

export const addProductToWishList = (wish, user) => {
    return dispatch => {
        if (user == null) {
            dispatch({
                type: actionType.ADDED_ATTRACTION_TO_WISH_LIST,
                payload: wish
            })
            return;
        }
        axios.post("http://localhost:57828/api/wish/Post/", wish)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: actionType.ADDED_ATTRACTION_TO_WISH_LIST,
                    payload: wish
                });
            })
            .catch(err => console.log(err))
    }
}

export const deleteProductFromWishList = (user, attractionId) => {
    return dispatch => {
        if (user == null){
            dispatch({
                type: actionType.ATTRACTION_DELETED_FROM_WISH_LIST,
                payload: attractionId
            })
            return;
        }
        axios.delete("http://localhost:57828/Api/wish/Delete?attractionId=" + attractionId)
            .then(response => {
                dispatch({
                    type: actionType.ATTRACTION_DELETED_FROM_WISH_LIST,
                    payload: attractionId
                });
            })
            .catch(err => console.log(err))
    }
}