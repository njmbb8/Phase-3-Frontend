import React from "react";
import { Link } from "react-router-dom";

function ItemCard({item}){
    console.log(item)
    return (
        <Link to={`/items/${item.id}`}>
            <figure className="item" id={item.id}>
                <img src={`/assets/${item.image}`} class="item_image" alt={item.name} />
                <figcaption>
                    <h3>{item.name}</h3>
                    <p>{`$${item.price}`}</p>
                </figcaption>
            </figure>
        </Link>
    )
}

export default ItemCard