import React from "react";
import UserListItem from "./UserListItem";

function UserBrowser({users}){
    const fakeUser = {
        id: 0,
        first_name: "Add a new user",
        last_name: '',
        address: ''
    }
    return(
        <div>
            <UserListItem user={fakeUser} />
            {users.map((user) => <UserListItem user={user} key={user.id}/>)}
        </div>
    )
}

export default UserBrowser