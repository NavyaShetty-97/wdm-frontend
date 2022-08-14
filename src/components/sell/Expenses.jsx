/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/


import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import { NavLink } from 'react-router-dom';
import "../property/property.scss";
// import '../login/login.scss'
import propertyHelper from "../../util/property.util";
import { useHistory } from "react-router";
import { API_ENDPOINT } from '../../endpoints/api.dev';

const Expenses = () => {
    const sessionUser = {
        ID: JSON.parse( localStorage.getItem("sessionUser")),
    };
    const [landId, setLand] = useState("");
    // const [landname, setExpensename] = useState("");
    const [ancestor, setSellTo] = useState([]);
    const [landdesc, setExpensedesc] = useState("");
    const [landsize, setExpensesize] = useState(0);
    const [landcost, setExpensecost] = useState(0);
    const [selectedAncestor, setSelectedAcncestor] = useState(-2);
    const [land, setLandSize] = useState(0);
    const [errors, setErrors] = useState({});
    const [lands, setLandDetails] = useState([])
    const user = sessionUser.ID.user_id;

    useEffect(() => {
        setErrors({});
    }, [landId, ancestor, landdesc, landsize, landcost]);

    const handleSubmit = () => {
        const url = API_ENDPOINT + "lands/sellLand.php";
        let payload = {
            landId,
            selectedAncestor,
            landdesc,
            landsize,
            landcost,
            user
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log("Message not sent");
            });
    }

    useEffect(() => {
        const url = API_ENDPOINT + "lands/listLands.php";
        let payload = {
            ID: sessionUser.ID.user_id
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log('res', res);
                setLandDetails(res);
                insertAncestors();
            }).catch(err => {
                console.log("Message not sent");
            });

        const userDetails = API_ENDPOINT + "dashboard/userDetails.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(userDetails, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setLandSize(data.LandOwned);
            });
    }, [])

    const insertAncestors = () => {
        fetch(API_ENDPOINT + 'users/getUsersWithoutID.php', {
            method: "POST",
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log('sell to', res);
                setSellTo(res);
            }).catch(err => {
                alert("Message not sent");
            }
            );
    }

    return (

        <div className="property-parent-container">
            <Header />
            <section id="property-parent-container" className="py-50" style={{ justifyContent: "center" }}>
                <div>
                    <div className="row align-items-center h-100">
                        <div className="property-parent">
                            <div id="formContent">
                                <div style={{ fontSize: '2.3rem' }}>Land Deed</div><br></br>
                                <div style={{ color: '#57468a', fontSize: '17.5px' }}>Land owned: </div>{land} sq. m<br></br>
                                <h2 className="active"></h2>
                                <div className="fadeIn first">
                                </div>
                                <form id="loginForm">
                                    <select name="landid" id="landId" className="ancestor_dd" placeholder="Select Land" onChange={(e) => setLand(e.target.value)}>
                                        <option value={-1}>Select Land</option>
                                        {console.log(lands)}
                                        {lands && lands.map((val) => {
                                            return (
                                                <option value={val['ID']}>{val['ID']} - {val['Size']}</option>
                                            )
                                        })}
                                    </select>
                                    <select name="ancestor" id="ancestor" className="ancestor_dd" required onChange={(e) => setSelectedAcncestor(e.target.value)} >
                                        <option value="Empty">Sell or Bequest To</option>
                                        {ancestor && ancestor.map((val) => {
                                            return (
                                                <option value={val['ID']}>{val['FirstName']} {val['LastName']}</option>
                                            )
                                        })}
                                        <option value={-2}>Outide the Family</option>
                                    </select>

                                    <textarea class="propCss" id="landdesc" autocomplete="off"
                                        placeholder="Description" onChange={(e) => setExpensedesc(e.target.value)} />

                                    <input class="propCss" type="number" id="landsize" autocomplete="off" name="size"
                                        placeholder="Land Size" onChange={(e) => setExpensesize(e.target.value)} />

                                    <input class="propCss" type="number" id="landcost" autocomplete="off" name="cost"
                                        placeholder="Sell Price" onChange={(e) => setExpensecost(-1 * e.target.value)} />

                                    <input type="button" id="loginSubmit" className="fadeIn fourth" value="Sell" onClick={() => handleSubmit()} />
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


export default Expenses;