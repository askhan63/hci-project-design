import React, { useEffect, useState } from "react";
import './index.css'
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Onboard from "../../components/Onboard";
import { useNavigate } from "react-router-dom";



function HomePage() {
    const [showOnboard, toggleOnboard] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("show")) {
            setTimeout(() => {
                toggleOnboard(true)
            }, 1000)
        }
    })


    const introSection = () => {
        return <div className="introSection"><div>
            Welcome
        </div>
            <div className="pd">
                What can we help you with today ?
            </div></div>

    }

   




    return (
        <div>
            <Header type="noback" />
            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" /> */}
            {/* {showTop} */}
            {showOnboard && <Onboard hide={toggleOnboard} />}
            <div className="mb">
                <Link to="/search">
                    <div className="actions">
                        <div>
                            Search An App
                        </div>
                      
                    </div>
                </Link>
                <div>
                    <Link to="/tutorials">
                        <div className="actions">
                            <div>
                                Search Tutorials
                            </div>
                            
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to="/user">
                        <div className="actions">
                            <div>
                                Schedule a Session
                            </div>
                
                        </div>
                    </Link>
                </div>
            </div>
            <Menu contact = {"no"} home = {"yes"} />
        </div>
    )
}

export default HomePage;