
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import "./About.css";
import about_img from "../../assets/images/about.jpg";

const About = () => {
    return (
        <div className="">
            <Header />
            {/* <div className="c py-50 containers"> */}
            <div style={{display: 'flex'}}>
                <div className="about-img">
                    <img src={about_img} alt="" />
                </div>

                <div className="about-container">
                    <h1>About <span style={{ color: "#c5bde1" }}>DIAZ-SIFONTES</span></h1>
                    <p>DIAZ-SIFONTES was founded in 2009 with the mission of simplyifying financial decisions and information to give landowners the confidence to manage every aspect of their financial life.
                    </p>
                    <p> We keep your property details up-to-date.</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About;
