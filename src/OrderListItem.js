import React from "react";
import { Link } from "react-router-dom";

function OrderListItem({order}){
    return(
        <Link className="listRow" to={order.id!==0?`/orders/${order.id}`:'/addorder'} >
            <p>{order.id === 0? 'Add a new order' : order.id}</p>
            <p>{order.id === 0? '' : order.updated_at}</p>
        </Link>
    )
}

export default OrderListItem