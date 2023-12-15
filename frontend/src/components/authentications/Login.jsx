import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import "./loginScript.js";

const Login = () => {
    const [status, setStatus] = useState(0);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [input, setInput] = useState("");
    const [res, setRes] = useState("");
 
    signIn = () => {
        setInput(`{"user": "${user}", "password": "${password}"}`);
        const fetchLoginData = () => {
            fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify(input)
            })
                .then(response => {
                    setStatus(response.status);
                    return response.json()
                })
                .then(data => {
                    if (status === 200) {
                        setRes(JSON.stringify(data));
                        document.cookie = `username=${res.username}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        document.cookie = `jwt=${res.JWT}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    }
                    else if (status === 403) {
                        document.getElementById("errorMessage").innerText = "Incorrect username or password";
                    }

                })
                .catch(error => {
                    console.error(`Error: ${error}`);
                });
        }
        fetchLoginData();
    }

    passwordSignIn = () => {
        setUser(document.getElementById("user"));
        setPassword(document.getElementById("password"));
        if (user === "") {
            alert("Invalid input, please type it again!");
            return;
        }
        if (password === "") {
            alert("Invalid input, please type it again!");
            return;
        }
        signIn();
    }

    oauthSignIn = () => {
        setUser(email);
        setPassword("googlehdfe")
        signIn()
    }


    return (
        <div>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
            <div class="container p-10 my-10 border bg-info">
                <div class="container p-5 my-5 border bg-white">
                    <h1>User login</h1>
                    <h2 id="errorMessage"></h2>
                    <form action="https://localhost:3000/login" method="POST" id="loginform">
                        <input type="text" name="username" id="username" placeholder="Username" /><br />
                        <input type="password" name="password" id="password" placeholder="password" /><br />
                        <div class="g-signin2" data-onsuccess={oauthSignIn()}></div><button onClick={passwordSignIn()}></button><i class="bi bi-file-person"></i>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;