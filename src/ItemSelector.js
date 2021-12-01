import react from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";

function ItemSelector({items}){
    const emptyItem = {
        id:0,
        image: 'question.jpg',
        name: 'add an item',
        price: '0'
    }
    return(
        <div id="item-display">
            <ItemCard item={emptyItem} />
            {items.map((item) => <ItemCard item={item} key={item.id} />)}
        </div>
    )
}

export default ItemSelector