import React, { useState } from "react";
import './index.css'
import Header from '../../components/Header';
import Menu from '../../components/Menu'
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { checkConflict, generateDateFormat } from "../../utils";


import "react-datepicker/dist/react-datepicker.css";

let sessionsVal = 0

function SessionList() {

    const navigate = useNavigate()

    const [formData, setFromData] = useState({
        firstName: "",
        lastName: "",
        time: '00:00',
        startDate: Date.now(),
        phoneNumber: "",
        password: "",
        topic: ""
    })


    const [data, setData] = useState([])

    function handle(e) {

        const { value, name } = e.target;

        setFromData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
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

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const resetValidations = () => {
            document.getElementById('error_fname').innerHTML = "";
        
            document.getElementById('error_fname').innerHTML = "";
        
            document.getElementById('error_lname').innerHTML = "";
        
            document.getElementById('error_lname').innerHTML = "";
       
            document.getElementById('error_time').innerHTML = "";
       
            document.getElementById('error_phno').innerHTML = "";
      
            document.getElementById('error_phno').innerHTML = "";
        
            document.getElementById('error_pwd').innerHTML = "";
       
            document.getElementById('error_topic').innerHTML = "";
    }

    const addData = (e) => {

        e.preventDefault();
        resetValidations();
        const { firstName, lastName, time, phoneNumber, password, topic, startDate } = formData
        if (firstName === "") {
            document.getElementById('error_fname').innerHTML = "First Name is required";
        } else if (firstName.match(/\d/)) {
            document.getElementById('error_fname').innerHTML = "Name cannot have numbers";
        }
        else if (lastName === "") {
            document.getElementById('error_lname').innerHTML = "Last Name is required";
        } else if (lastName.match(/\d/)) {
            document.getElementById('error_lname').innerHTML = "Name cannot have numbers";
        }
        else if (time === "") {
            document.getElementById('error_time').innerHTML = "Time is required";
        }
        else if (phoneNumber === "") {
            document.getElementById('error_phno').innerHTML = "Phone Number is required";
        }
        else if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            document.getElementById('error_phno').innerHTML = "invalid phone number";
        }
        else if (password === "" || password.length <6) {
            document.getElementById('error_pwd').innerHTML = "Password needs atleast 6 characters";
        }
        else if (topic === "") {
            document.getElementById('error_topic').innerHTML = "Topic is required";
        }
        else {
            const date = generateDateFormat(formatDate(startDate), time)
            if(date < (new Date())){
                document.getElementById('generic_error').innerHTML = "Please select a future time slot";
                return
            }
            if (!localStorage.getItem('data')) {
                const newObject = {
                    currentUser: `${phoneNumber}`,
                    [`${phoneNumber}`]: {
                        password,
                        "sessions": [{
                            sessionid: `${sessionsVal + 1}${makeid(4)}`,
                            date: formatDate(startDate),
                            topic: topic,
                            volunteer_no: 1,
                            time: time,
                            link: `zoom.us/${makeid(5)}`
                        }]
                    }
                }
                sessionsVal += 1
                localStorage.setItem('data', JSON.stringify(newObject))
                navigate("/confirm")
            } else {
                const data = JSON.parse(localStorage.getItem('data'))
                if (phoneNumber in data) {
                    const f_password = data[phoneNumber].password
                    if (f_password !== password) {
                        document.getElementById('error_pwd').innerHTML = "Incorrect Password";
                        return
                    } else {
                        //Check if meetings overlap, [starttime, starttime+30]
                        const updatedDate = formatDate(startDate)
                        const currentSessions = data[phoneNumber].sessions
                        for (let i = 0; i < currentSessions.length; i++) {
                            if (checkConflict(currentSessions[i].date, currentSessions[i].time, updatedDate, time)) {
                                document.getElementById('generic_error').innerHTML = "Time Conflict, please select another time slot";
                                return
                            }
                        }
                        const updatedSessions = [...data[phoneNumber].sessions, {
                            sessionid: `${sessionsVal + 1}${makeid(4)}`,
                            date: updatedDate,
                            topic: topic,
                            volunteer_no: 1,
                            time: time,
                            link: `zoom.us/${makeid(5)}`
                        }]
                        const updatedObject = {
                            ...data,
                            currentUser: `${phoneNumber}`,
                            [`${phoneNumber}`]: {
                                password: data[phoneNumber].password,
                                "sessions": updatedSessions
                            }
                        }

                        sessionsVal += 1
                        localStorage.setItem('data', JSON.stringify(updatedObject))
                        navigate("/confirm")

                    }
                } else {
                    const newObject = {
                        ...data,
                        currentUser: `${phoneNumber}`,
                        [`${phoneNumber}`]: {
                            password: password,
                            "sessions": [{
                                sessionid: `${sessionsVal + 1}${makeid(4)}`,
                                date: formatDate(startDate),
                                topic: topic,
                                volunteer_no: 1,
                                time: time,
                                link: `zoom.us/${makeid(5)}`
                            }]
                        }
                    }
                    sessionsVal += 1
                    localStorage.setItem('data', JSON.stringify(newObject))
                    navigate("/confirm")
                }
            }
        }

    }

    return (
        <div className="menuPg">
            <Header type="back" />
            <div className="inputForm">
                <div className="rows">
                    <div className="label">First Name</div>
                    <div className="field">
                        <input type="text"
                            name='firstName'
                            onChange={handle}
                            pattern="[a-zA-Z]*"
                        />
                        <span id="error_fname" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Last Name</div>
                    <div className="field">
                        <input type="text"
                            name='lastName'
                            onChange={handle}
                        />
                        <span id="error_lname" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Date</div>
                    <div className="field">
                        <DatePicker selected={formData.startDate} minDate={new Date()} onChange={(date) => {
                            setFromData({
                                ...formData,
                                startDate: date
                            })

                        }} />
                        <span id="error_date" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Time</div>
                    <div className="field">
                        <input type="time"
                            name='time'
                            onChange={handle}
                        />
                        <span id="error_time" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Phone Number</div>
                    <div className="field">
                        <input type="number"
                            name='phoneNumber'
                            onChange={handle}
                        />
                        <span id="error_phno" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Password</div>
                    <div className="field">
                        <input type="password"
                            name='password'
                            onChange={handle}
                        />
                        <span id="error_pwd" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="rows">
                    <div className="label">Topic</div>
                    <div className="field">
                        <input type="text"
                            name='topic'
                            onChange={handle}
                        />
                        <span id="error_topic" style={{ color: 'red' }}></span>
                    </div>
                </div>
                <div className="tc">
                    <span id="generic_error" style={{ color: 'red' }}></span>
                </div>
                <div className="submit">
                    <input type="button" value="SUBMIT" onClick={addData}></input>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default SessionList;