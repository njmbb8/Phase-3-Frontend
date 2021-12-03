import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import OrderContentListItem from "./OrderContentListItem";

function OrderPage({users, orders, items, dispatch}){
    const history = useHistory()
    const params = useParams() 
    const order = orders.filter((order) => order.id === parseInt(params.orderId))[0]
    const usersOptions = users.map((user) => <option selected={user.id === order.user_id} value={user.id}>{`${user.first_name} ${user.last_name} ${user.address}`}</option>)
    const orderContents = order.order_contents.map((content) => <OrderContentListItem dispatch={dispatch} orders={orders} items={items} orderContent={content} key={content.id} />)
    const fakeContent = {id: 0, order_id: 0, item_id: 0}
    
    function handleUserChange(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch(`http://localhost:9292/orders/${order.id}`,{
            method: 'PATCH',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                user_id: event.target[0].value,
                fulfilled: order.fulfilled
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            dispatch({type: "Loaded Orders", payload: orders.map((temp) => temp.id === order.id ? ret : temp)})
            dispatch({type: "Ready"})
        })
        .catch((error) => dispatch({type: error, payload: error}))
    }

    function deleteOrder(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch(`http://localhost:9292/orders/${order.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            dispatch({type: "Loaded Orders", payload: orders.filter((temp) => temp.id !== order.id)})
            history.push('/orders')
            dispatch({type: "Ready"})
        })
        .catch((error) => dispatch({type: error, payload: error}))
    }

    return (
        <div>
            <div id="shippingInfo">
                <h1>Ships to:</h1>
                <form onSubmit={handleUserChange}>
                    <select>
                        {usersOptions}
                    </select>
                    <input type="submit"/>
                </form>
            </div>
            <div id="ordercontents">
                <h1>Contents</h1>
                <Link to={`/orders/${order.id}/addcontents`} >Add contents to order</Link>
                {orderContents}
            </div>
            <div onClick={deleteOrder}>
                <h1>Delete Order</h1>
            </div>
        </div>
    )
}

export default OrderPage