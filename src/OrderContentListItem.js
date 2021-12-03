import React from "react";

function OrderContentListItem({orders, items, orderContent, dispatch}){
    const itemOptions = items.map((item) => <option selected={item.id === orderContent.item_id} value={item.id} key={item.id}>{item.name}</option>)
    const order = orders.filter((temp) => temp.id === orderContent.order_id)[0]
    function handleUpdate(event){
        event.preventDefault()
        dispatch("Unready")
        fetch(`http://localhost:9292/contents/${orderContent.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                item_id: event.target[0].value,
                order_id: order.id,
                quantity: event.target[1].value
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            order.order_contents = order.order_contents.map((temp) => temp.id === ret.id ? ret : temp)
            dispatch({type: 'Loaded Orders', payload: orders.map((temp) => temp.id === order.id ? order : temp)})
            dispatch({type: 'Ready'})
        })
    }

    function deleteItem(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        fetch(`http://localhost:9292/contents/${orderContent.id}`,{
            method:'DELETE'
        })
        .then(() => {
            order.order_contents = order.order_contents.filter((temp) => temp.id !== orderContent.id)
            dispatch({type: "Loaded Orders", payload: orders.map((temp) => temp.id === order.id ? order : temp)})
            dispatch({type: "Ready"})
        })
    }
    return(
        <div>
            <form onSubmit={handleUpdate}>
                <select name="item">
                    {itemOptions}
                </select>
                <input type="number" name="quantity" defaultValue={orderContent.quantity} />
                <input type="submit" />
            </form>
            <div onClick={deleteItem}><p>Delete</p></div>
        </div>
    )
}

export default OrderContentListItem