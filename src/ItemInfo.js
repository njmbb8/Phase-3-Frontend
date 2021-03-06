import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";

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
            dispatch({type: "Loaded Items", payload: items.filter((index) => index.id !== item.id)})
            dispatch({type: "Ready"})
        })
        .catch((error) => console.log(error))
    }

    return(
        <div id="ItemInfo">
            <img id="itemImage" src={`http://localhost:9292/images/${item.image}`} />
            <h1 id="itemName">{item.name}</h1>
            <h3 id="itemPrice">{item.price}</h3>
            <Link to={`/editItem/${item.id}`} id="editButton" className="button" >
                {/* <div id="editButton" className="button">Edit</div> */}
                Edit
            </Link>
            <div id="deleteButton" className="button" onClick = {deleteItem}>Delete</div>
        </div>
    )
}

export default ItemInfo