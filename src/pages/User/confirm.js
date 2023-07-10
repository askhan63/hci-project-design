import React from "react";
import './index.css'
import Header from '../../components/Header';
import Menu from '../../components/Menu'
import Final from '../../images/final.png'

function SessionList() {
    return (
        <div className="menuPg">
            <Header type="back" />
            <div>  
                <div className="image">
                    <img src={Final}/>
                </div>
                <div className="text">
                    Event Created Succesfully
                </div>
                <div className="instructions">
                    <div>
                        To view your scheduled sessions
                    </div>
                    <div>
                        Home &gt; Schedule a Session &lt; Existing Session
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default SessionList;