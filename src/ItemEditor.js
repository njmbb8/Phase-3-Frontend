import React from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function ItemEditor({items, dispatch}){
    const params = useParams()
    const history = useHistory()
    const item = items.filter((item) => parseInt(params.itemId) === item.id)[0]
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [imageURL, setImageURL] = useState(`http://localhost:9292/images/${item.image}`)
    const [imageName, setImageName] = useState(item.image)
    let imageChanged = false

    function handleFileChange(event){
        setImageURL(URL.createObjectURL(event.target.files[0]))
        setImageName(event.target.files[0].name)
        imageChanged = true
    }

    function handlePriceChange(event){
        setPrice(event.target.value)
    }

    function handleNameChange(event){
        setName(event.target.value)
    }

    function handleFormSubmit(event){
        event.preventDefault()
        dispatch({type: "Unready", payload: "Updating user"})
        fetch(`http://localhost:9292/items/${item.id}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                price: price,
                image: imageName
            }),
        })
        .then((data) => data.json())
        .then((ret) => {
            if(item.image !== ret.image){
                const formData = new FormData()
                formData.append('image', event.target[0].files[0])
                fetch(`http://localhost:9292/upload`,{
                    method: 'POST',
                    body: formData
                })
            }
            dispatch({type: 'Loaded Items', payload: items.map((temp) => temp.id !== ret.id ? temp : ret)})
            history.push('/')
            dispatch({type: "Ready"})
        })
        .catch((error) => dispatch({type: "Error", payload: error}))
    }

    return(
        <div>
            <img src={imageURL} />
            <form onSubmit={handleFormSubmit}>
                <input type="file" name="image" onChange={handleFileChange}/>
                <input type="text" name="name" onChange={handleNameChange} value={name}/>
                <input type="number" name="price" onChange={handlePriceChange} value={price}/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default ItemEditor