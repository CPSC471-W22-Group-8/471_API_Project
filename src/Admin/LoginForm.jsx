import React, { useState } from "react";
import Axios from 'axios';


//"newAdminLogin"
function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("localhost:5000/user/user1", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
        })

    }


    return (
        <div className="App">
            <div className="login">
                <h1>Admin Login</h1>
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