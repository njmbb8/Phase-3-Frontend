import React from "react";
import OrderListItem from "./OrderListItem";
import { useHistory } from "react-router-dom";

function OrderAdder({users, dispatch, orders}){
    const usersOptions = users.map((user) => <option value={user.id}>{`${user.first_name} ${user.last_name} ${user.address}`}</option>)
    const history = useHistory()
    function handleNewOrder(event){
        event.preventDefault()
        dispatch({type: 'Ready'})
        fetch('http://localhost:9292/orders',{
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                user_id: event.target[0].value
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            dispatch({type: "Loaded Orders", payload: [...orders, ret]})
            history.push(`/orders/${ret.id}`)
            dispatch({type: "Ready"})
        })
    }

    return(
        <form onSubmit={handleNewOrder}>
            <select>
                <option selected value={0}>Please Select a User</option>
                {usersOptions}
            </select>
            <input type="submit" />
        </form>
    )
}

export default OrderAdder