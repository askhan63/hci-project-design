import React, { useState } from "react";
import './index.css'
import { Link } from "react-router-dom";



function Menu({ type, home = "no", contact = "no" }) {
    const styleClassName = (type === "fixed") ? "fixedMenu" : "fixedMenu"
    const [showMenu, toggleMenu] = useState(false)
    const menuCss = (showMenu)?"styleGrey":""
    const homeCss = (home === "yes")?"styleGrey":""
    const contactCss = (contact === "yes")?"styleGrey":""
    return (
        <div>

            {showMenu && <div className="menuBody">
                <div className="crossMenu" onClick = {()=>{toggleMenu(false)}}>X</div>
                <div className="items">
                    <div><h1>Saved Videos</h1></div>
                </div>
                <div className="items">
                    <div><h1>Volunteer Sign-in</h1></div>
        
                </div>
                <div className="items">
                    <div><h1>FAQ's</h1></div>
                    
                </div>
                <div className="items">
                    <div><h1>About Us</h1></div>
                   
                </div>
            </div>}
            <div className={styleClassName}>
                <div className="menuflex">
                    <div className={`menuDiv ${contactCss}`}>
                        <Link to="/contact">
                            <i onClick = {()=>{toggleMenu(false)}}>Contact</i>
                            {/* <img src={Call} /> */}
                        </Link>
                    </div>

                    <div className={`menuDiv ${homeCss}`}>
                        <Link to="/">
                            <i onClick = {()=>{toggleMenu(false)}} >Home</i>
                            {/* <img src={Home} /> */}
                        </Link>
                    </div>

                    <div className={`menuDiv ${menuCss}`} onClick={() => { toggleMenu(!showMenu) }}>
                       Manu
                        {/* <img src={MenuImg} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu