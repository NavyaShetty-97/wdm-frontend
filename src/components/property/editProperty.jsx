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
    const propertyDetails = {
        ID: JSON.parse( localStorage.getItem("property_id")),
    };
    const user = sessionUser.ID.user_id;
    const project_id = propertyDetails.ID.ID;
    const [projectname, setProjectname] = useState("");
    const [projectdesc, setProjectdesc] = useState("");
    const [lands, setLands] = useState([]);
    const [land, setLand] = useState(-1);
    const [cost, setCost] = useState(0);
    const [type, setType] = useState(propertyDetails.ID.type);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLand(-1);
        setType(propertyDetails.ID.type);
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
        
        const getProject = API_ENDPOINT + "projects/get_project.php";
        fetch(getProject, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: project_id,
                type: type
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setProjectname(data[type.toLowerCase() + '_title']);
                setProjectdesc(data[type.toLowerCase() + '_desc']);
                if(data.land_id != null) setLand(data.land_id);
                setCost(data[type.toLowerCase() + '_cost']);
            });
    }, []);

    useEffect(() => {
        setErrors({});
    }, [projectname, projectdesc, cost]);

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

    const handelExpense = () => {
        const url = API_ENDPOINT + "projects/put_expense.php";
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

    return (
        <div className="property-parent-container">
            <Header />
            <section id="property-parent-container" className="py-50">
                <div>
                    <div className="row align-items-center h-100" style={{ justifyContent: "center" }}>
                        <div className="property-parent">
                            <div id="formContent">
                                <h1>Edit {type}</h1><br></br>
                                <form id="loginForm">
                                    <select name="ancestor" id="ancestor" className="ancestor_dd" defaultValue={type}>
                                        <option disabled={true}>{type}</option>
                                    </select>

                                    <input class="propCss" type="text" id="projectname" autocomplete="off" name="login" value={projectname} required onChange={(e) => setProjectname(e.target.value)} />

                                    <textarea class="propCss" id="projectdesc" autocomplete="off"
                                        value={projectdesc} onChange={(e) => setProjectdesc(e.target.value)} />

                                    <select name="ancestor" id="ancestor" className="ancestor_dd" value={parseInt(land)} onChange={(e) => setLand(e.target.value)}>
                                        <option value={-1}>Select Land</option>
                                        {lands && lands.map((val) => {
                                            return (
                                                <option value={val['ID']}>{val['ID']} - {val['Size']} sq. m</option>
                                            )
                                        })}
                                    </select>

                                    <input class="propCss" type="text" id="cost" autocomplete="off" name="cost"
                                        value={cost} onChange={(e) => setCost(e.target.value)} />

                                    <input type="button" id="loginSubmit" className="fadeIn fourth" value='Submit' onClick={() => handelSubmit()} />
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
