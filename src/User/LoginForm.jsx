import React, { useState } from "react";
import Axios from 'axios';


//"newUserLogin"
function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "password": "101010"
        });

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/user/login/user1", {requestOptions})
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


        /* Anish's version
        Axios.get("http://localhost:5000/user/login/user1", {
            username: username,
            password: password,
        })
        .then((response) => {
            console.log(response);
        })
        */
    }


    return (
        <div className="App">
            <div className="login">
                <h1>User Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                />
                <button onClick={login}>Login</button>



            </div>


        </div>


    )


}

export default LoginForm;