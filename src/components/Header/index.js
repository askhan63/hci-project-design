import React from "react";
import './index.css'
import { Link } from "react-router-dom";
// import MenuImg from '../../images/menu.png'
// import Home from '../../images/home.png'
// import Call from '../../images/call.png'
// import Close from '../../images/close.png';
// import Back from '../../images/back.png'
import { useNavigate } from "react-router-dom";


function Header({ type }) {
    let navigate = useNavigate();
    const showBackHeader = type && type === 'back'
    const withBack = <div className="header">
        <div className="w20" onClick={() => navigate(-1)}>
        <i class="bi bi-arrow-left icon-style-arrow"></i>
            {/* <img src={Back} /> */}
        </div>
        <div className="flex w60">
            <Link to={"/"}>V-Assist</Link>
        </div>
    </div>

    const noBack = <div className="header">
    <div className="flex">
        <Link to={"/"}>V-Assist</Link>
    </div>
</div>
    return (
        <div>
            {type === "noback"?noBack:withBack}
        </div>
    )
}
export default Header