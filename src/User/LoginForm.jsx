import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


//"newUserLogin"
function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    
    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var user = username;
        var raw = JSON.stringify({
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:5000/user/login/${user}`, requestOptions)
        .then(function(response){
            if (response.ok){
                alert('Login Successfull!')
                navigate('/user/userpage')
            }
            else{
                alert('Login Unsuccessfull!')
            }
        })
        
        .then(result => console.log(result))
        .catch(error => console.log('error', error));



        // fetch('http://localhost:5000/user/login/user1', {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }).then((res) => {
        //     console.log("this is res", res)
        // }).catch((err) => {
        //     console.log(err)
        // })


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