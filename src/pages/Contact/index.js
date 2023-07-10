import React from "react";
import './index.css'
import Header from '../../components/Header';
import Menu from '../../components/Menu';


function HomePage() {
    return (
        <div>
            <Header type="back" />

            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" /> */}
            <div className="contactSection">
                <div className="sth">
                    Reach us on
                </div>
                <div className="emails">
                    <div>
                        Vashisht.Gupta@utdallas.edu
                    </div>
                    <div>
                        Ankit.Upadhyay@utdallas.edu
                    </div>
                    <div>
                        Srushti.Sachdev@utdallas.edu
                    </div>
                    <div>
                        Rutvik.Avaiya@utdallas.edu
                    </div>
                </div>
            </div>
            <Menu contact = {"yes"} home = {"no"}/>
        </div>
    )
}

export default HomePage;