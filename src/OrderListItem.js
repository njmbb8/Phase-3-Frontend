import React from "react";
import { Link } from "react-router-dom";

function OrderListItem({order}){
    return(
        <Link className="listRow" to={`/orders/${order.id}`} >
            <p>{order.id}</p>
            <p>{order.updated_at}</p>
        </Link>
    )
}

export default OrderListItem