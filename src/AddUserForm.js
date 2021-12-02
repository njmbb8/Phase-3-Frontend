import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function AddUserForm({users, dispatch}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const history = useHistory()

    function handleFNameChange(event){
        setFirstName(event.target.value)
    }

    function handleLNameChange(event){
        setLastName(event.target.value)
    }

    function handleAddressChange(event){
        setAddress(event.target.value)
    }

    function addUser(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch("http://localhost:9292/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                address: address
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            history.push('/users')
            dispatch({type: "Loaded Users", payload: [...users, ret]})
            dispatch({type: "Ready"})
        })
        .catch((error) => dispatch({type: "Error", payload: error}))
    }

    return(
        <div>
            <form onSubmit={addUser}>
                <input type="text" name="first_name" onChange={handleFNameChange} value={firstName} />
                <input type="text" name="Last_name" onChange={handleLNameChange} value={lastName} />
                <input type="text" name="address" onChange={handleAddressChange} value={address} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddUserForm