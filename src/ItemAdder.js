import React from "react";
import { useHistory } from "react-router-dom";

function ItemAdder({items, dispatch}){
    const history = useHistory();
    function addItem(event){
        event.preventDefault()
        dispatch({type: "Unready"})
        const item = Object.fromEntries(new FormData(event.target))
        fetch("http://localhost:9292/items",
        {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: item.name,
                price: item.price,
                image: item.image.name
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            const formData = new FormData()
            formData.append('image', item.image)
            fetch("http://localhost:9292/upload",
            {
                method: 'post',
                body: formData
            })
            .then(() => {
                dispatch({type: 'Ready', payload: [...items, ret]})
                history.push('/')
            })
            .catch((error) => dispatch({type: "Error", payload: error}))
        })
        .catch((error) => dispatch({type: "Error", payload: error}))
    }

    return(
        <div id='itemAdder'>
            <form onSubmit={addItem} >
                <input type="text" name="name" />
                <input type="file" name="image" />
                <input type="number" name="price" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default ItemAdder