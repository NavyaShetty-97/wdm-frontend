
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import { NavLink } from 'react-router-dom';
import "./login.scss";
import loginPage from "../../util/login.util";
import { useHistory } from "react-router";
import { API_ENDPOINT } from '../../endpoints/api.dev';


const Login = (props) => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        setErrors({});
    }, [password, email]);

    var loginUserFunction = () => {
        let errorsReturn = loginPage({ email, password });
        setErrors(errorsReturn);
        if (Object.keys(errorsReturn).length == 0) {
            if (email == 'user@mail.com' && password == 'user@123') history.push("/Dashboard");
            else {
                let tempErrors = {
                    "credentials": "You have entered the wrong credentials please try agian."
                };
                setErrors(tempErrors);
            }
        }

        fetch(API_ENDPOINT + '/login/getLoginUser.php', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                user_name: email,
                password: password
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                if (data.status == 'success') {
                    localStorage.setItem('sessionUser', JSON.stringify({
                        user_name: email,
                        user_id: data.ID
                    }));
                    props.history.push('/dashboard');
                }
                else {
                    setErrors({
                        credentials: "You have entered the wrong credentials please try agian."
                    });
                }
            });

    };


    var loginFunction = () => {
        let errorsReturn = loginPage({ email, password });
        setErrors(errorsReturn);
        if (Object.keys(errorsReturn).length == 0) {
            if (email == 'admin@mail.com' && password == 'admin@123') {
                localStorage.setItem('sessionAdmin', JSON.stringify({
                    user_name: email,
                    user_id: 0
                }));
                props.history.push("/login-admin");
            }
            else {
                let tempErrors = {
                    "credentials": "You have entered the wrong credentials please try agian."
                };
                setErrors(tempErrors);
            }
        }

        // fetch(API_ENDPOINT + '/login/getLogin.php', {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify({
        //         user_name: email,
        //         password: password
        //     })
        // })
        //     .then(data => {
        //         return data.json();
        //     })
        //     .then(data => {
        //         if (data.status == 'success') {
        //             props.history.push('/login-admin');
        //         }
        //         else {
        //             setErrors({
        //                 credentials: "You have entered the wrong credentials or the user is not verified."
        //             });
        //         }
        //     });
    };



    return (
        <div className="login-parent-container">
            <Header />
            <section id="login-parent-container" className="py-50">
                <div className="container">
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="wrapper login-parent">
                            <div id="formContent">
                                <h2 className="active"> Sign In </h2>
                                <div className="fadeIn first">
                                </div>
                                <form id="loginForm">
                                    <div id="emailError"></div>
                                    <input type="text" id="useremail" autocomplete="off" name="login" placeholder="User Email" required onChange={(e) => setEmail(e.target.value)} />
                                    <div id="passwordError"></div>
                                    <input type="password" id="password" autocomplete="off" name="login"
                                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                                    <input type="button" id="loginSubmit" className="fadeIn fourth" value="Log In" onClick={() => loginUserFunction()} />
                                    <input type="button" id="loginSubmit" className="fadeIn fourth" value="Log In Admin" onClick={() => loginFunction()} />
                                    {errors && (
                                        <div className="errors mt-15">
                                            {Object.keys(errors).map((item, i) => (
                                                <div className="error-message" key={i}>
                                                    <span className="error-label"><b>{errors[item]}</b></span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </form>
                                <div id="formFooter">
                                    <a className="underlineHover" href="signup.html" >
                                        <NavLink activeClassName="active" to="/signup">
                                            Create Account
                                        </NavLink>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Login;
