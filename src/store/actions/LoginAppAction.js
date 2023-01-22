import * as actionType from '../reducers/actionType'
export const changeLoginApp = (id) => {
    return dispatch => {
        dispatch({
            type: actionType.CHANGE_LOGIN_APP,
            payload: true
        });
    }
}