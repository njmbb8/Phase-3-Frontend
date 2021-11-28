import react from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";

function ItemSelector({items}){
    const emptyItem = {
        image: 'question.jpg',
        name: 'add an item',
        price: '0'
    }
    return(
        <div id="item-display">
            {items.map((item) => <ItemCard item={item} key={item.id} />)}
            <Link to='/additem'>
                <ItemCard item={emptyItem} />
            </Link>
        </div>
    )
}

export default ItemSelector