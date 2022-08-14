
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Header(props) {
    const history = useHistory();
    const logout = () => {
        if (localStorage.getItem("sessionUser")) localStorage.removeItem("sessionUser");
        if (localStorage.getItem("sessionAdmin")) localStorage.removeItem("sessionAdmin");
        history.push("/");
    }
    return (
        <div>
            <header id="header">
                <div className="container">
                    <div className="row" id="navbar">
                        <div className="logo">
                            <h1><a href="/" title="Diaz-Sifontes"><span style={{ color: "#57468a", fontWeight: 'bolder' }}>DIAZ-</span>SIFONTES</a></h1>
                            <h5>Family inheritance in ISLA DE MARGARITA</h5>
                        </div>
                        {!localStorage.getItem("sessionAdmin") &&
                            <nav className="nav_item">
                                <ul>
                                    <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                                </ul>
                            </nav>
                        }
                        {!localStorage.getItem("sessionAdmin") &&
                            <nav className="nav_item">
                                <ul>
                                    <li><NavLink activeClassName="active" to="/About">About</NavLink></li>
                                </ul>
                            </nav>
                        }
                        {!localStorage.getItem("sessionAdmin") &&
                            <nav className="nav_item">
                                <ul>
                                    <li><NavLink activeClassName="active" to="/Contact">Contact</NavLink></li>
                                </ul>
                            </nav>
                        }
                        <nav className="nav_item">
                            <ul>
                                <li><a href="http://rps9248.uta.cloud/blog10/">Blog</a></li>
                            </ul>
                        </nav>
                        <nav className="nav_item">
                            <ul>
                                <li><NavLink activeClassName="active" to="/chatsupport">Chat</NavLink></li>
                            </ul>
                        </nav>
                        {(!localStorage.getItem("sessionAdmin") && localStorage.getItem("sessionUser")) &&
                            <nav className="nav_item">
                                <ul>

                                    <li><NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink></li>
                                </ul>
                            </nav>
                        }
                        {(!localStorage.getItem("sessionAdmin") && localStorage.getItem("sessionUser")) &&
                            <nav className="nav_item">
                                <ul>
                                    <li><NavLink activeClassName="active" to="/familyTree">Family</NavLink></li>
                                </ul>
                            </nav>
                        }
                        {(localStorage.getItem("sessionUser") || localStorage.getItem("sessionAdmin")) &&
                            <nav className="nav_item">
                                <ul className="cursor" onClick={() => logout()}>
                                    <li>Logout</li>
                                </ul>
                            </nav>
                        }
                        {(localStorage.getItem("sessionUser") === null && localStorage.getItem("sessionAdmin") === null) &&
                            <nav className="nav_item">
                                <ul>
                                    <li><NavLink activeClassName="active" to="/login">Login/Register</NavLink></li>
                                </ul>
                            </nav>
                        }
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
