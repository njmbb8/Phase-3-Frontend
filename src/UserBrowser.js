import React from "react";
import UserListItem from "./UserListItem";

function UserBrowser({users}){
    return(
        <div>
            {users.map((user) => <UserListItem user={user} key={user.id}/>)}
        </div>
    )
}

export default UserBrowser