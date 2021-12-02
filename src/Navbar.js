import React from "react";
import { NavLink } from "react-router-dom"

const linkStyles = {
    padding: "0px 10px"
}

function Navbar(){
    return (
        <div id="navbar">
            <div id="face">
                <img src="/assets/logo.svg"/>
            </div>
            <div id="links">
                <NavLink
                    to="/"
                    exact
                    style={linkStyles}
                >
                    Products
                </NavLink>
                <NavLink
                    to="/users"
                    style={linkStyles}
                >
                    Users
                </NavLink>
                <NavLink
                    to="/commision"
                    style={linkStyles}
                >
                    Orders
                </NavLink>
                <NavLink
                    to="/news"
                    style={linkStyles}
                >
                    New Order
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar