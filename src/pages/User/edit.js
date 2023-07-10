import React, { useEffect, useState } from "react";
import './index.css'
import Header from '../../components/Header';
import Menu from '../../components/Menu'
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkConflict, generateDateFormat } from "../../utils";


import "react-datepicker/dist/react-datepicker.css";

function SessionList() {
    const [values, updateValues] = useState({
        date: new Date(),
        time: '00:00',
        topic: ''
    })

    const [showConfirm, updateConfirm] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const [showData, noShowData] = useState(false)



    useEffect(() => {
        const { id = -1 } = params
        const data = JSON.parse(localStorage.getItem("data"))
        const { currentUser } = data
        const sessions = data[currentUser].sessions || []
        const sessionsToFilter = sessions.filter((item) => (id === item.sessionid)) || []
        if (sessionsToFilter.length > 0) {
            const content = sessionsToFilter[0]
            updateValues({
                date: new Date(content.date),
                topic: content.topic,
                time: content.time
            })

        } else {
            noShowData(true)
        }
    }, [])


    useEffect(() => {
        if (showConfirm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";

        }
    }, [showConfirm])


    const onChangeValue = (event) => {
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })



    }

    const deleteSessions = () => {
        const { time, topic } = values
        const data = JSON.parse(localStorage.getItem("data"))
        const { currentUser } = data
        const { id = -1 } = params
        var editedSession = { sessionid: id, topic: values.topic, time: values.time, date: formatDate(values.date) };
        const sessions = data[currentUser].sessions || []
        const newSessions = sessions.filter((item) => item.sessionid !== id).map(item => item);
        const updatedObject = {
            ...data,
            [currentUser]: {
                password: data[currentUser].password,
                sessions: newSessions
            }

        }
        localStorage.setItem("data", JSON.stringify(updatedObject))
        navigate("/sessions")
    }

    const updateSession = () => {

        const { time, topic } = values

        if (time === "") {
            document.getElementById('err_time').innerHTML = "Time is required";
        }

        else if (topic === "") {
            document.getElementById('err_topic').innerHTML = "Topic is required";
        }

        const data = JSON.parse(localStorage.getItem("data"))
        const { currentUser } = data
        const { id = -1 } = params
        var editedSession = { sessionid: id, topic: values.topic, time: values.time, date: formatDate(values.date) };
        const sessions = data[currentUser].sessions || []
        if(generateDateFormat(formatDate(values.date), values.time) < (new Date())){
            document.getElementById('generic_error').innerHTML = "Please select a future time slot";
            return
        }
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].sessionid !== editedSession.sessionid) {
                if (checkConflict(sessions[i].date, sessions[i].time, formatDate(values.date), values.time)) {
                    document.getElementById('generic_error').innerHTML = "Time Conflict, please select another time slot";
                    return
                }
            }
        }
        const newSessions = sessions.map((item) => {
            if (item.sessionid === editedSession.sessionid) {
                editedSession.volunteer_no = item.volunteer_no
                editedSession.link = item.link
            }
            return item.sessionid !== editedSession.sessionid ? item : editedSession
        }
        );
        const updatedObject = {
            ...data,
            [currentUser]: {
                password: data[currentUser].password,
                sessions: newSessions
            }

        }
        localStorage.setItem("data", JSON.stringify(updatedObject))
        navigate("/sessions")
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }

    return (
        <div className="menuPg">
            <Header type="back" />
            {!showData && <div className="inputForm">
                <form onSubmit={(e) => { e.preventDefault(); updateSession() }}>
                    <div className="rows pdt20">
                        <div className="label">Date</div>
                        <div className="field">
                            <DatePicker selected={values.date} minDate={new Date()} onChange={(date) => {
                                updateValues({
                                    ...values,
                                    date
                                })

                            }} />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="label">Time</div>
                        <div className="field">
                            <input name="time" type="time" value={values.time} onChange={onChangeValue} />
                            <span id="err_time" style={{ color: "red" }}></span>
                        </div>
                    </div>
                    <div className="rows">
                        <div className="label">Topic</div>
                        <div className="field">
                            <input type="text" name="topic" value={values.topic} onChange={onChangeValue} />
                            <span id="err_topic" style={{ color: "red" }}></span>
                        </div>
                    </div>
                    <div className="tc">
                        <span id="generic_error" style={{ color: 'red' }}></span>
                    </div>
                    <div className="flxBtn">
                        <div className="buttons" onClick={() => { updateConfirm(true) }}>Delete</div>
                        <div className="buttons" onClick={() => { updateSession() }}>Edit</div>
                    </div>
                </form>
            </div>}
            {showData && <div className="centerData">
                There is no data for this session
            </div>}
            <Menu />
            {showConfirm && <><div className="overlay"></div>

                <div className="onboardContent">
                    <div className="onContnew">
                        Are you sure you want to delete this entry ?
                        This cannot be undone!

                        <div className="next">
                            {<div className="butn" onClick={() => {
                                updateConfirm(false)
                                deleteSessions()
                            }} >Yes</div>}
                            {<div className="butn" onClick={() => {
                                updateConfirm(false)
                            }}>No</div>}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default SessionList;