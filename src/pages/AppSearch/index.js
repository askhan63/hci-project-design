import React, { useEffect, useState } from "react";
import './index.css'

import Header from '../../components/Header';
import Menu from '../../components/Menu'
// import Microphone from '../../images/microphone.png'
// import Target from '../../images/target.png'
// import TomThumb from '../../images/tomthumb.png'
// import Walmart from '../../images/walmart.png'
import data from "../../Data/data1.json"
import { useNavigate } from "react-router-dom";

const categories = ["Grocery", "Pharmacy", "Restaurant", "Coffee Shops", "Bank", "Social Media", "Transport", "Online Shopping"]

function AppSearch() {
    const navigate = useNavigate()
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState(categories);
    const [search, setSearch] = useState("");
    const [loaders, updateLoaders] = useState(false)
    const [result, updateResult] = useState([])

    const SpeechRecognitionWorks = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

   

    useEffect(() => {
        if (!display && search)
            fetchData()
    }, [display, search])

    const renderLoaders = () => {
        return (
            <div>
                <div className="loaderDiv">

                </div>
                <div className="loaderDiv">

                </div>
                <div className="loaderDiv">

                </div>
            </div>
        )
    }


    const fetchData = () => {
        setDisplay(false)
        updateLoaders(true)
        setTimeout(() => {
            if (search.toLowerCase() in data) {
                updateLoaders(false)
                updateResult(data[search.toLowerCase()])
            } else {
                updateLoaders(false)
                updateResult([])
            }
        }, 2000)
    }

    const renderResults = () => {
        if (result.length > 0) {
            const results = result.map((value, index) => {
                const { about = "", link = "", title } = value
                return (
                    <div key={index} className="brandsColList">

                        <div className="parent">
                            <a href={value.weburl}>
                                <img className="brand" src={value.img} />
                            </a>
                        </div>
                        {about && <div className="desc">
                            {about}
                        </div>}
                        {link && <div className="tutorials" onClick = {()=>{navigate(`/tutorials?query=${link}`)}}>
                            <div className="icon">
                                <i class="bi bi-youtube icon-style-youtube"></i>
                            </div>
                            <div className = "contentLink"> {title} Tutorials  </div>
                        </div>}

                    </div>
                )
            })

            return results
        } else {
            if (search.length === 0) {
                return <div className="failText"> What are you looking for today ?</div>
            } else {
                return <div className="failText">Hmm, Apps not found :/, Try Something else</div>
            }
        }
    }

    return (
        <div className="pb8">
            <Header />
            <div className="">
                <div className="search" onClick={() => setDisplay(!display)}>
                    <div className="w75">
                        <form onSubmit={(e) => { e.preventDefault(); fetchData() }}>
                            <input type="text" placeholder="Type Something" value={search} onChange={event => setSearch(event.target.value)}></input>
                        </form>
                    </div>
                 
                </div>
              
            </div>
            {loaders && renderLoaders()}
            {!loaders && renderResults()}
            <Menu type="fixed" />
        </div>
    )
}

export default AppSearch;