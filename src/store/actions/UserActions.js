import axios from "axios";
  
export const login = (user) => {
    return(dispatch) => {
        axios.post("http://localhost:57828/Api/user/login/",user)
        .then(response => {
            console.log(response.data)
            if(response.data.success){ 
                dispatch(currentUser(response.data.user))
                return true;
            }
            alert("שם המשתמש או הסיסמא שגויים!");
            return false;
        })
        .catch(err => console.log(err))
    }
}

export const addUser = (user) => {
    return dispatch => {
      axios.post("http://localhost:57828/Api/user/Post", user)
      .then(x => {
          if(x.data==null)
             alert("שם זה כבר קיים אצלנו");
          if(user.Status==1)
            dispatch(currentUser(x.data));
      })
      .catch(err => console.log(err))
    }
}

export const currentUser = (user) =>{
    return {
        type: "CURRENT_USER",
        payload: user
    }
}

export const getUsers = () => {
    return  axios.get("http://localhost:57828/Api/user/GetUsers")
}

export const getUserById = (userId) => {
    return axios.get("http://localhost:57828/Api/user/GetUserById?userId="+ userId);
}

export const deleteUser = (user) => {
    return axios.delete("http://localhost:57828/Api/user/Delete", user);
}