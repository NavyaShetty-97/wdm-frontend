
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState } from 'react'
import Header from '../header/Header';
import Footer from "../footer/Footer";
import "./Contact.css";
import { API_ENDPOINT } from '../../endpoints/api.dev';
const Contact = () => {

  const [ name, setName ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name, subject, phone, email, message);
    const url = API_ENDPOINT+"/contact/putContact.php";
    let id = 1;
    let data = {
      id: id,
      name: name,
      subject: subject,
      phone: phone,
      email: email,
      message: message
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert("Message sent successfully");
          setName("");
          setSubject("");
          setPhone("");
          setEmail("");
          setMessage("");
        } else {
          alert("Message not sent");
        }
      }).catch(err => {
        alert("Message not sent");
      }
    );
  }
    return (
        <div className="">
            <Header />
           
            <section className="section-contact py-20">
                <div className="container">
                    <p className="top-content-headers"><span style={{color: "#57468a"}}>Contact</span>&nbsp;Us </p>
                    <div className="layout">	 
                        <div className="text-center">
                          <p>You can write us for any concerns and appreciations !</p>
                        </div>
                        <div className="g-8 contact-form">
                            <div className="form-inline ">
                              <div className="contact-group g-6">
                                <input type="text" placeholder="name" id="Name" name="name" className="contact-form-control" onChange={(e) => setName(e.target.value)}/>
                              </div>
                              <div className="contact-group g-6">
                                <input type="text" placeholder="subject" id="Subject" name="subject" className="contact-form-control" onChange={(e) => setSubject(e.target.value)}/>
                              </div>
                              <div className="contact-group g-6">
                                <input type="tel" placeholder="phone" id="Phone" name="phone" className="contact-form-control" onChange={(e) => setPhone(e.target.value)}/>
                              </div>
                              <div className="contact-group g-6">
                                <input type="email" placeholder="email address" id="Email" name="email" className="contact-form-control" onChange={(e) => setEmail(e.target.value)}/>
                              </div>
                              <div className="contact-group g-12">
                                <textarea placeholder="message" id="Message" rows="3" name="message" className="contact-form-control" onChange={(e) => setMessage(e.target.value)}></textarea>
                              </div>
                            </div>
                            
                            <div id="submit" className="contact-group g-12" onClick={(e) => submitForm(e)}>
                              <input type="submit" value="send" className="btn" id="send_message"/>
                            </div>
                        </div> 
                        <div className="g-12">       
                          <div className="icon-text">
                          </div>
                          <div className="icon-holder">
                          </div>
                        </div>
                    </div>	
                </div>
              
            </section>	
              <Footer />
        </div>
    )
}

export default Contact;

