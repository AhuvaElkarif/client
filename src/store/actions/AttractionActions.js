import axios from "axios";

export const getAttractions = () => {
    return (dispatch) => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        axios.get("http://localhost:57828/Api/attraction/GetAttractions")
            .then(response => {
                dispatch({
                    type: "SAVE_ALL_ATTRACTIONS",
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
export const getAttractionsByUserId = (id) =>{
    return dispatch => {
        axios.get("http://localhost:57828/Api/attraction/GetAttractionsByUserId/"+id)
            .then(response => {
                console.log(response);
                dispatch({
                    type: "SAVE_ALL_ATTRACTIONS",
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

export const getRelevantAttractions = () => {
    axios.get("http://localhost:57828/Api/attraction/getRelevantAttractions")
}
export const addAttraction = (attraction) => {
    return (dispatch) => {
        axios.post("http://localhost:57828/Api/attraction/addAttraction", attraction)
            .then(response => {
                dispatch({
                    type: "ATTRACTION_ADDED",
                    payload: response.data
                });
                console.log(response);
            })
            .catch(err => { console.log(err) })
    }
}


export const deleteAttraction = (id, ind) => {
    return (dispatch) => {
        axios.delete("http://localhost:57828/Api/attraction/deleteAttraction/" + id)
            .then(response => {
                dispatch({
                    type: "ATTRACTION_DELETED",
                    payload: ind
                });
                console.log(response);
            })
            .catch(err => { console.log(err) })
    }
}

export const updateAttraction = (item) => {
    return (dispatch) => {
        axios.put("http://localhost:57828/Api/attraction/updateAttraction/" + item.id, item)
            .then(response => {
                dispatch({
                    type: "ATTRACTION_UPDATED",
                    payload: item
                });
                console.log(response);
            })
            .catch(err => console.log(err))
    }
}

export const getImagesByAttractionId = (attractionId) => {
    return axios.get("http://localhost:57828/Api/image/GetImagesByAttractionId?attractionId=" + attractionId)
}