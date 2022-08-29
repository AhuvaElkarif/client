import React from 'react';


function SingleUser({user}) {
    return (<>
           <span>{user.Name}</span>
           <span>{user.Email}</span>
    </>);
}

export default SingleUser;


