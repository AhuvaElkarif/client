import * as actionType from '../reducers/actionType';
import axios from "axios";
import swal from 'sweetalert';

export const login = (user, type) => {
    return dispatch => {
        axios.post("http://localhost:57828/Api/user/post2/", user)
            .then(response => {
                console.log(response)
                if (response.data != null) {
                    if (type != 2 || type == 2 && response.data.Status == 2) {
                        if (response.data.Active) {
                            dispatch(currentUser(response.data))
                           return;
                        }
                    }
                }
                swal({
                    title: "שם המשתמש או הסיסמא שגויים!",
                    icon: "warning",
                    button: "אישור",
                });
            })
            .catch(err => console.log(err))
    }
}

export const addUser = (user) => {
    return dispatch => {
        axios.post("http://localhost:57828/Api/user/Post", user)
            .then(x => {
                if (x.data == null)
                    alert("שם זה כבר קיים אצלנו");
                dispatch(currentUser(x.data));
            })
            .catch(err => console.log(err))
    }
}
export const updateUser = (user) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/user/Put", user)
            .then(x => {
                dispatch(currentUser(x.data));
            })
            .catch(err => console.log(err))
    }
}
export const changePassword = (user) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/user/ChangePassword", user)
            .then(x => dispatch(currentUser(x.data)))
            .catch(err => console.log(err))
    }
}

export const currentUser = (user) => {
    return {
        type: actionType.CURRENT_USER,
        payload: user
    }
}

export const getManagersUsers = () => {
    return axios.get("http://localhost:57828/Api/user/GetManagersUsers")
}

export const getUserById = (userId) => {
    return axios.get("http://localhost:57828/Api/user/GetUserById?userId=" + userId);
}

export const deleteUser = (user) => {
    return axios.delete("http://localhost:57828/Api/user/Delete", user);
}

export const getUserByEmail = (email) => {
    return axios.get("http://localhost:57828/Api/user/getUserByEmail?email=" + email);
}

export const changeUsersStatus = (users) => {
   return axios.put("http://localhost:57828/Api/user/ChangeUsersStatus",users);
}