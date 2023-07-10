import React, { useEffect, useState } from "react";
import './index.css'
//import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu'
import { useNavigate } from "react-router-dom";

function SessionList() {

    const [sessionsData, updateSessions] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"))
        const { currentUser } = data
        const sessions = data[currentUser].sessions || []
        const upcomingSessions = sessions.filter((item) => ((new Date(`${item.date} ${item.time}`) - Date.now()) >= 0)) || []
        const existingSessions = sessions.filter((item) => {
            return ((new Date(`${item.date} ${item.time}`) - Date.now()) < 0)
        }) || []
        updateSessions({
            upcomingSessions,
            existingSessions
        })
    }, [])


    const renderExistingSessions = () => {
        const existingSessions = sessionsData.existingSessions || []
        const result = existingSessions.map((item, index) => (
            <div key={index} className="sessionItem">
                <div className="flx">
                    <div className="w30">Topic:</div>
                    <div className="w70">{item.topic}</div>
                </div>
                <div className="flx">
                    <div className="w30">Date:</div>
                    <div className="w70">{item.date}</div>
                </div>
                <div className="flx">
                    <div className="w30">Time:</div>
                    <div className="w70">{item.time}</div>
                </div>
                <div className="flx">
                    <div className="w30">Link:</div>
                    <div className="w70">{item.link}</div>
                </div>
            </div>
        ))
        return result.length === 0 ? <div className="centerData">No Previous Sessions</div> : result
    }

    const renderUpcomingSessoins = () => {
        const upcomingSessions = sessionsData.upcomingSessions || []
        const result = upcomingSessions.map((item, index) => (
            <div key={index} className="sessionItem">
                <div className="flx">
                    <div className="w30">Topic:</div>
                    <div className="w70">{item.topic}</div>
                </div>
                <div className="flx">
                    <div className="w30">Date:</div>
                    <div className="w70">{item.date}</div>
                </div>
                <div className="flx">
                    <div className="w30">Time:</div>
                    <div className="w70">{item.time}</div>
                </div>
                <div className="flx">
                    <div className="w30">Link:</div>
                    <div className="w70">{item.link}</div>
                </div>
                <div className="flxBtn">
                    <div className="buttons" onClick={() => { navigate(`/edit/${item.sessionid}`) }}>Change</div>
                </div>
            </div>
        ))
        return result.length === 0 ? <div className="centerData">No Upcoming Sessions</div> : result
    }


    return (
        <div className="menuPg">
            <Header type="back" />
            <div className="pb8">
                <div className="parentList">
                    <div className="sessionList">
                        Upcoming Session(s)
                    </div>
                    {renderUpcomingSessoins()}
                </div>
                <div>
                    <div className="parentList">
                        <div className="sessionList" >
                            Previous Session(s)
                        </div>
                        {renderExistingSessions()}
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default SessionList;