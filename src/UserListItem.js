import React from "react";
import { Link } from "react-router-dom";

function UserListItem({user}){
    return(
        <Link to={`/users/${user.id}`}className="listRow">
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <p>{user.address}</p>
        </Link>
    )
}

export default UserListItem