import React from "react";
import './index.css'
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu'

function User() {
    return (
        <div className="menuPg">
            <Header type="back" />
            <div className="userOptions">
                <div className="choice">
                    <div >
                        <Link to="/registration">New Session</Link>
                    </div>
                </div>
                <div>
                    <div className="choice">
                        <div >
                          <Link to="/login">Existing Session</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default User;