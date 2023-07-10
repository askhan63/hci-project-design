import React, { useState, useEffect } from "react";
import './index.css'
import { useNavigate } from "react-router-dom";



const data = ["Hi New User! Use Search Apps to find apps to carry out your favorite activities", "Use Search Tutorial to find video tutorials on Youtube", "Schedule a Session to learn apps from a volunteer"]

function Onboard({ hide }) {

    const navigate = useNavigate()

    const [index, updateIndex] = useState(0)

    useEffect(() => {
        localStorage.setItem("show", 1)
        document.body.style.overflow = "hidden";

        return function cleanup() {
            document.body.style.overflow = "";
        };

    })
    return (
        <><div className="overlay"></div>

            <div className="onboardContent">
                <div className="crossImg">
                    <span className="imgW" onClick={() => { hide(false) }}>x</span>
                </div>
                <div className="onCont">
                    <div>
                      {data[index]}
                    </div>
                    <div>
                    {index === 0 && <div className="butn2" onClick={()=>{navigate("/search")}} >Try App Search</div>}
                    {index === 1 && <div className="butn2" onClick={()=>{navigate("/tutorials")}} >Try Tutorial Search</div>}
                    {index === 2 && <div className="butn2" onClick={()=>{navigate("/user")}} >Try Scheduling a Session</div>}
                    </div>
                    <div className="next">
                      {index>0 && <div className="butn" onClick={()=>{updateIndex(index-1)}} >Prev</div>}
                       {index < 2 && <div className="butn" onClick={()=>{updateIndex(index+1)}}>Next</div>}
                    </div>
                </div>
                </div>
        </>
            )
}
            export default Onboard