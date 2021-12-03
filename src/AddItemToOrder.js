import React from "react";
import { useParams, useHistory } from "react-router-dom";

function AddItemToOrder({items, orders, dispatch}){
    const params = useParams()
    const history = useHistory()
    const order = orders.filter((temp) => temp.id === parseInt(params.orderID))[0]
    const itemsOptions = items.map((item) => <option value={item.id}>{item.name}</option>)

    function handleNewContents(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch('http://localhost:9292/addcontents', {
            method:'POST',
            headers:{
                "Content-type": 'application/json'
            },
            body:JSON.stringify({
                item_id: event.target[0].value,
                order_id: params.orderID,
                quantity: event.target[1].value
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            order.order_contents = [...order.order_contents, ret]
            dispatch({type: "Loaded Orders", payload: [...orders, order]})
            history.push(`/orders/${params.orderID}`)
            dispatch({type: 'Ready'})
        })
    }
    return (
        <form onSubmit={handleNewContents}>
            <select name="items">
                {itemsOptions}
            </select>
            <input type="number" name="quantity"></input>
            <input type="submit" />
        </form>
    )
}

export default AddItemToOrder