
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState, useEffect } from 'react'
import './Signup.scss';
import Header from '../header/Header';
import Footer from "../footer/Footer";
import { NavLink } from 'react-router-dom';
import signupPage from "../../util/signup.util";
import { API_ENDPOINT } from '../../endpoints/api.dev';

function Signup(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [ancestor, setAncestor] = useState("");
    const [parent, setParent] = useState("");
    const [relationshiptoancestor, setRelationshiptoancestor] = useState("");
    const [errors, setErrors] = useState({});
    const [ancestors, setAncestors] = useState([]);

    useEffect(() => {
        fetch(API_ENDPOINT+'/signup/ancestors.php')
            .then(data => {
                return data.json();
            })
            .then(data => setAncestors(data));
    }, []);

    useEffect(() => {
        setErrors({});
    }, [name, password, firstname, lastname, ancestor, parent]);

    const signupFunction = () => {
        let errorsReturn = signupPage({ name, password, firstname, lastname, ancestor, parent });
        setErrors(errorsReturn);
        if (Object.keys(errorsReturn).length == 0) {
            dbTransaction();
        }
    };

    const dbTransaction = () => {
        const InsertAPIURL = API_ENDPOINT+"/signup/signup.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const Data = {
            name: name,
            password: password,
            firstname: firstname,
            lastname: lastname,
            ancestorId: ancestor,
            parent: parent,
            isAdmin: 0
        };

        fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response !== 'Error') {
                    localStorage.setItem('sessionUser', JSON.stringify({
                        user_name: response.user_name,
                        user_id: response.user_id
                    }));
                    props.history.push('/dashboard');
                }
            })
            .catch((error) => {
                alert("Error Occured" + error); 
            })
    };

    return (
        <div className="signup-parent-cotainer">
            <Header />
            <section id="login-parent-container" className="py-50">
                <div className="container">
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="wrapper login-parent">
                            <div id="formContent">
                                <h2 className="active"> Sign Up </h2>
                                <form id="loginForm">
                                    <input type="text" id="name" autocomplete="off" name="name" placeholder="Username" required onChange={(e) => setName(e.target.value)} />
                                    <input type="password" id="password" autocomplete="off" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                    <input type="text" id="firstname" autocomplete="off" name="firstname" placeholder="First Name" required onChange={(e) => setFirstname(e.target.value)} />
                                    <input type="text" id="lastname" autocomplete="off" name="lastname" placeholder="Last Name" required onChange={(e) => setLastname(e.target.value)} />
                                    <select name="ancestor" id="ancestors" className="ancestor_dd" placeholder="Select Ancestor" required onChange={(e) => setAncestor(e.target.value)}>
                                        <option value={''}>Select Ancestor</option>
                                        {ancestors && ancestors.map((val) => {
                                            return (
                                                <option value={val['ID']}>{val['FirstName']} {val['LastName']}</option>
                                            )
                                        })}
                                    </select>
                                    <input type="text" id="parentid" name="parent" placeholder="Parent Username" required onChange={(e) => setParent(e.target.value)} />

                                    {errors && (
                                        <div className="errors mt-15">
                                            {Object.keys(errors).map((item, i) => (
                                                <div className="error-message" key={i}>
                                                    <span className="error-label"><b>{errors[item]}</b></span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <input type="button" className="fadeIn fourth" value="Sign up" onClick={() => signupFunction()} />
                                </form>
                                <div id="formFooter">
                                    <a className="underlineHover" href="login.html">
                                        <NavLink activeClassName="active" to="/login">
                                            Already have an account? Sign In
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

export default Signup
