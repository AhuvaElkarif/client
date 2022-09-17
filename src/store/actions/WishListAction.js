import axios from "axios";

export const getWishList = (userId) => {
    return (dispatch) => {
        // dispatch({
        //     type: "SET_LOADING",
        //     payload: true
        // });
        axios.get("http://localhost:57828/Api/wish/GetWishesByUserId?userId="+userId)
            .then(response => {
                dispatch({
                    type: "WISH_LIST_ACCEPTED",
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

export const addProductToWishList = (wish, user) => {
    return dispatch => {
        if (user == null) {
            dispatch({
                type: "ADDED_ATTRACTION_TO_WISH_LIST",
                payload: wish
            })
            return;
        }
        axios.post("http://localhost:57828/Api/wish/Post/", wish)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: "ADDED_ATTRACTION_TO_WISH_LIST",
                    payload: wish
                });
            })
            .catch(err => console.log(err))
    }
}

export const deleteProductFromWishList = (user, attractionId) => {
    return dispatch => {
        if (user == null)
            dispatch({
                type: "ATTRACTION_DELETED_FROM_WISH_LIST",
                payload: attractionId
            })
        axios.delete("http://localhost:57828/Api/wish/Delete?attractionId="+ attractionId)
            .then(response => {
                dispatch({
                    type: "ATTRACTION_DELETED_FROM_WISH_LIST",
                    payload: attractionId
                });
            })
            .catch(err => console.log(err))
    }
}