/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import { NavLink } from 'react-router-dom';
import "./property.scss";
import propertyHelper from "../../util/property.util";
import { useHistory } from "react-router";
import { API_ENDPOINT } from '../../endpoints/api.dev';

const Property = () => {
    const sessionUser = {
        ID: JSON.parse( localStorage.getItem("sessionUser")),
    };
    const user = sessionUser.ID.user_id;
    const project_id = null;
    const [projectname, setProjectname] = useState("");
    const [projectdesc, setProjectdesc] = useState("");
    const [lands, setLands] = useState([]);
    const [land, setLand] = useState(-1);
    const [cost, setCost] = useState(0);
    const [errors, setErrors] = useState({});
    const [type, setType] = useState('Project');
    const [holders, setHolders] = useState([type + 'Name', type + 'Description', type + 'Cost']);

    useEffect(() => {
        setLand(-1);
        const API = API_ENDPOINT + "lands/listLands.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const Data = {
            ID: user
        };

        fetch(API, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setLands(data);
            });
    }, []);

    useEffect(() => {
        setErrors({});
    }, [projectname, projectdesc, cost]);

    const refreshForm = (e) => {
        setType(e.target.value);
    }

    useEffect(() => {
        setHolders([
            type + ' Name',
            type + ' Description',
            type + ' Cost'
        ])
    }, [type]);

    const handelSubmit = () => {
        let errorsReturn = propertyHelper({ projectname });
        setErrors(errorsReturn);
        if (Object.keys(errorsReturn).length == 0) {
            if (type == "Project") {
                handelProject();
            }
            else if (type == "Trial") {
                handelTrial();
            }
            else {
                handelExpense();
            }
        }
    }

    const handelProject = () => {
        const url = API_ENDPOINT + "projects/put_project.php";
        let payload = {
            project_id,
            projectname,
            projectdesc,
            land,
            cost,
            user
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .catch(err => {
                alert("Message not sent");
            }
            );
    }

    const handelTrial = () => {
        const url = API_ENDPOINT + "projects/put_trials.php";
        let payload = {
            projectname,
            projectdesc,
            land,
            cost,
            user
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .catch(err => {
                alert("Message not sent");
            }
            );
    }

    const handelExpense = () => {
        const url = API_ENDPOINT + "projects/put_expense.php";
        let payload = {
            projectname,
            projectdesc,
            land,
            cost,
            user
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .catch(err => {
                alert("Message not sent");
            }
            );
    }

    return (
        <div className="property-parent-container">
            <Header />
            <section id="property-parent-container" className="py-50">
                <div>
                    <div className="row align-items-center h-100" style={{ justifyContent: "center" }}>
                        <div className="property-parent">
                            <div id="formContent">
                                <h1>Add {type}</h1><br></br>
                                <form id="loginForm">
                                    <select name="ancestor" id="ancestor" className="ancestor_dd" defaultValue={type} onChange={refreshForm}>
                                        <option value="Project">Project</option>
                                        <option value="Trial">Trial</option>
                                        <option value="Expense">Expense</option>
                                    </select>

                                    <input class="propCss" type="text" id="projectname" autocomplete="off" name="login" placeholder={holders[0]} required onChange={(e) => setProjectname(e.target.value)} />

                                    <textarea class="propCss" id="projectdesc" autocomplete="off"
                                        placeholder={holders[1]} onChange={(e) => setProjectdesc(e.target.value)} />

                                    <select name="ancestor" id="ancestor" className="ancestor_dd" placeholder="Select Land" onChange={(e) => setLand(e.target.value)}>
                                        <option value={-1}>Select Land</option>
                                        {lands && lands.map((val) => {
                                            return (
                                                <option value={val['ID']}>{val['ID']} - {val['Size']} sq. m</option>
                                            )
                                        })}
                                    </select>

                                    <input class="propCss" type="text" id="cost" autocomplete="off" name="cost"
                                        placeholder={holders[2]} onChange={(e) => setCost(e.target.value)} />

                                    <input type="button" id="loginSubmit" className="fadeIn fourth" value='Add' onClick={() => handelSubmit()} />
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Property;
