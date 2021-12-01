import React from "react";
import { Link } from "react-router-dom";

function ItemCard({item}){
    return (
        <Link to={item.id!==0?`/items/${item.id}`:'/additems'}>
            <figure className="item" id={item.id}>
                <img src={`http://localhost:9292/images/${item.image}`} className="item_image" alt={item.name} />
                <figcaption>
                    <h3>{item.name}</h3>
                    <p>{`$${item.price}`}</p>
                </figcaption>
            </figure>
        </Link>
    )
}

export default ItemCard