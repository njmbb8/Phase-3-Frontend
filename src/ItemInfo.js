import React from "react";
import { useParams, useHistory } from "react-router-dom";

function ItemInfo({items, dispatch}){
    const params = useParams()
    const item = items.filter((item) => parseInt(params.itemId) === item.id)[0]
    const history = useHistory()

    function deleteItem(){
        dispatch({type: 'Unready', payload: 'Deleting Item...'})
        fetch(`http://localhost:9292/items/${item.id}`,
        {
            method: 'delete'
        })
        .then(() => {
            history.push('/')
            dispatch({type: "Ready", payload: items.filter((index) => index.id !== item.id)})
        })
        .catch((error) => console.log(error))
    }

    return(
        <div id="ItemInfo">
            <img id="itemImage" src={`http://localhost:9292/images/${item.image}`} />
            <h1 id="itemName">{item.name}</h1>
            <h3 id="itemPrice">{item.price}</h3>
            <div id="editButton" className="button">Edit</div>
            <div id="deleteButton" className="button" onClick = {deleteItem}>Delete</div>
        </div>
    )
}

export default ItemInfo