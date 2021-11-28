import React from "react";
import { useParams } from "react-router-dom";

function ItemInfo({items}){
    const params = useParams()
    const item = items.filter((item) => parseInt(params.itemId) === item.id)[0]

    return(
        <div id="ItemInfo">
            <img src={`/assets/${item.image}`} />
            <h1>{item.name}</h1>
            <h3>{item.price}</h3>
        </div>
    )
}

export default ItemInfo