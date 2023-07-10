import React, { useState } from "react";
import './index.css'
import { Link } from "react-router-dom";
import MenuImg from '../../images/menu.png'
import Home from '../../images/home.png'
import Call from '../../images/call.png'
import Heart from '../../images/heart.png'

function Menu({ type }) {
    const styleClassName = (type == "fixed") ? "fixedMenu" : "fixedMenu"
    const [showMenu, toggleMenu] = useState(false)
    return (
        <div>
           
        </div>
    )
}
export default Menu