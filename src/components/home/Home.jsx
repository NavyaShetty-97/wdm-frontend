
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import "./home.css";
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div className="">
            <Header />
            <div id="home_disp">
                <div className="container">
                    <div>
                        <h1><span style={{ color: "#c5bde1" }}>Sign up</span> and get your lands registered.</h1>
                        <h1>Add your <span style={{ color: "#c5bde1" }}>projects, trials and expenses</span>.</h1>
                        <h1>Keep track of your <span style={{ color: "#c5bde1" }}>inheritance</span>.</h1>
                        <div className='to-login'>
                            <NavLink activeClassName="active" to="/login">Start here</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
