
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react';
import "./chatsupport.css";
import Header from '../header/Header';
import Footer from "../footer/Footer";
import { NavLink } from 'react-router-dom';

function chatsupport() {
    return (
        <div>
            <Header />
            <section className="section-contact py-20">
                <div className="container">
                    <p className="top-content-headers"><span style={{ color: "#57468a" }}>Chat</span> </p>
                    <div className="layout">

                        <div className="chat-container">
                            <iframe className='chat-panel' src="http://localhost:4444" />
                        </div>

                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}

export default chatsupport
