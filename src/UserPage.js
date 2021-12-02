import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import OrderListItem from "./OrderListItem";

function UserPage({users, dispatch}){
    const [orders, setOrders] = useState([])
    const params = useParams()
    const user = users.filter((user) => user.id === parseInt(params.userId))[0]
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [address, setAddress] = useState(user.address)
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

    function handleUserUpdate(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch(`http://localhost:9292/users/${user.id}`, {
            method: 'PATCH',
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
            dispatch({type:"Loaded Users", payload: users.map((temp) => temp.id !== ret.id ? temp : ret)})
            dispatch({type: "Ready"})
        })
    }

    function deleteUser(event){
        dispatch({type: 'Unready', payload: 'Deleting Item...'})
        fetch(`http://localhost:9292/users/${user.id}`,{
            method: "DELETE"
        })
        .then(()=>{
            dispatch({type:"Loaded Users", payload: users.filter((index) => index.id !== user.id)})
            history.push('/users')
            dispatch({type: "Ready"})
        })
    }

    useEffect(()=>{
        fetch(`http://localhost:9292/users/${user.id}/orders`)
        .then((data) => data.json())
        .then((ret) => {
            setOrders(ret)
        })
        .catch((error) => dispatch({type: "Error", payload: error}))
    }, [])
    
    return (
        <div>
            <div>
                <h1>Edit Info:</h1>
                <form id="userInfo" onSubmit={handleUserUpdate}>
                    <input type="text" name="first_name" value={firstName} onChange={handleFNameChange} />
                    <input type="text" name="last_name" value={lastName} onChange={handleLNameChange} />
                    <input type="text" name="address" value={address} onChange={handleAddressChange} />
                    <input type="submit" />
                </form>
            </div>
            <div id="orders">
                <h1>Orders:</h1>
                <ul>
                    {orders.map((order) => <OrderListItem order={order} key={order.id} />)}
                </ul>
            </div>
            <div id="deleteUser" onClick={deleteUser}><h2>DELETE USER</h2></div>
        </div>
    )
}

export default UserPage