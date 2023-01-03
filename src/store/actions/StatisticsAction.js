import axios from "axios"
import * as actionType from '../reducers/actionType';

export const getStatistic = () => {
    return dispatch =>{
     axios.get("http://localhost:57828/api/statistic/GetStatistic")
     .then(x => {
        dispatch({
            type: actionType.SAVE_ALL_STATISTICTS,
            payload: x.data
        });
    })
    .catch(err => console.log(err))
    }
}