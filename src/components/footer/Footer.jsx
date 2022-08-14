
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react'
import "./footer.css";

function Footer() {
    return (
        <div className="footer-parent">
            <footer id="footer" className="py-50">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-xs-6">
                            <h2>Contact Us:</h2>
                            <ul>
                                <li>Email: help@inherit.com</li>
                                <li>Phone: +1-(123)-456-7891</li>
                                <li>Fax: +1-(321)-654-1987</li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <h2>Office Address:</h2>
                            <ul>
                                <li>
                                    UTA Activity Center
                                </li>
                                <li>Arlington, TX, 76013</li>
                                <li>
                                    <p>Working Hours: 9AM - 5PM, Mon-Sat</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
