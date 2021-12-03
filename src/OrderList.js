import React from "react";
import OrderListItem from "./OrderListItem";

function OrderList({orders}){
    const fakeOrder = {
        id: 0,
        user_id: 0,
        fulfilled: false
    }
    return(
        <div>
            <OrderListItem order={fakeOrder} />
            {orders.map((order) => <OrderListItem order={order} />)}
        </div>
    )
}

export default OrderList