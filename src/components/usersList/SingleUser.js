import React from 'react';


function SingleUser({user}) {
    return (<>
           <span>{user.name}</span>
           <span>{user.email}</span>
           <span>{user.city}</span>
           <span>{user.street}</span>
           <span>{user.houseNum}</span>

    </>);
}

export default SingleUser;


