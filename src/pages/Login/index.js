import React, { useState } from "react";
import './index.css'
import Header from '../../components/Header';
import Menu from '../../components/Menu'
import { useNavigate } from "react-router-dom";



function SessionList() {

    const navigate = useNavigate()

    const [formData, setFromData] = useState({
        phoneNumber: "",
        password: ""
    })

    const [data, setData] = useState([])

    function handle(e) {
        const { value, name } = e.target;
        setFromData({
            ...formData,
            [name]: value
        })

    }

    const addData = (e) => {
        e.preventDefault();
        let data = localStorage.getItem("data")
        if(!data){
            document.getElementById('error_pwd').innerHTML = "User not found";
            return
        }
        data = JSON.parse(data)
        const { phoneNumber, password } = formData

        if (phoneNumber === "") {
            document.getElementById('error_phno').innerHTML = "Phone Number is required";
        }
        else if (password === "") {

            document.getElementById('error_pwd').innerHTML = "Password is required";
        }
        else {
            if (data) {
                if (phoneNumber in data) {
                    const user = data[phoneNumber]
                    const { password : actualpwd } = user
                    if(actualpwd !== password){
                        document.getElementById('error_pwd').innerHTML = "Incorrect Password";
                        return
                    } else {
                        navigate("/sessions")
                    }
                } else {
                    document.getElementById('error_pwd').innerHTML = "User not found";
                    return
                }
            } else {
                document.getElementById('error_pwd').innerHTML = "User not found";
                return
            }
        }

    }

    return (
        <div className="menuPg">
            <Header type="back" />
            <div className="inputForm">

                <div className="rows">
                    <div className="label">Phone Number</div>
                    <div className="field">
                        <input type="number"
                            name='phoneNumber'
                            value={formData.phoneNumber}
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
                            value={formData.password}
                        />
                        <span id="error_pwd" style={{ color: 'red' }}></span>
                    </div>
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