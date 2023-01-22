import axios from "axios";
import * as actionType from '../reducers/actionType';

export const getAttractions = () => {
    return dispatch => {
        axios.get("http://localhost:57828/api/attraction/GetAttractions")
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_ATTRACTIONS,
                    payload: response.data
                });
            })
            .catch(err => console.log(err))
    }
}

export const getAttractionsByUserId = (id) => {
    return dispatch => {
        axios.get("http://localhost:57828/api/attraction/GetAttractionsByUserId?userId=" + id)
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_ATTRACTIONS,
                    payload: response.data
                });
            })
            .catch(err => console.log(err))
    }
}

export const getRelevantAttractions = () => {
    axios.get("http://localhost:57828/api/attraction/getRelevantAttractions")
}
export const addAttraction = (attraction) => {
    return dispatch => {
        axios.post("http://localhost:57828/api/attraction/addAttraction", attraction)
            .then(response => {
                dispatch({
                    type: actionType.ATTRACTION_ADDED,
                    payload: response.data
                })
            })
            .catch(err => { console.log(err) })
    }
}


export const deleteAttraction = (id, ind) => {
    return (dispatch) => {
        axios.delete("http://localhost:57828/api/attraction/deleteAttraction/" + id)
            .then(response => {
                dispatch({
                    type: actionType.ATTRACTION_DELETED,
                    payload: ind
                });
            })
            .catch(err => { console.log(err) })
    }
}

export const updateAttraction = (item) => {
    return dispatch => {
        axios.put("http://localhost:57828/api/attraction/updateAttraction/", item)
            .then(x => {
                dispatch({
                    type: actionType.ATTRACTION_UPDATED,
                    payload: x.data
                });

            })
            .catch(err => console.log(err))
    }
}

export const getImagesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/api/image/GetImagesByAttractionId?attractionId=" + attractionId)
}

export const changeAttractionAvailable = (attractionId) => {
    return dispatch => {
        axios.put("http://localhost:57828/api/attraction/ChangeAttractionAvailable?attractionId=" + attractionId)
            .then(response => {
                dispatch({
                    type: actionType.ATTRACTION_UPDATED,
                    payload: response.data
                });
            })
            .catch(err => console.log(err))
    }
}

export const changeAttractionStatus = (attractionId) => {
    return dispatch => {
        axios.put("http://localhost:57828/api/attraction/ChangeAttractionStatus?attractionId=" + attractionId)
            .then(response => {
                dispatch({
                    type: actionType.ATTRACTION_UPDATED,
                    payload: response.data
                });
            })
            .catch(err => console.log(err))
    }
}


