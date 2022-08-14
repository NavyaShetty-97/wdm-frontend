import React from 'react'
import { useState } from 'react';
import './SendMessage.scss';
import { API_ENDPOINT } from '../../endpoints/api.dev';


export default function SendMessage(props) {
    const [name, setName] = useState(props.message.name);
    const [subject, setSubject] = useState(props.message.subject);
    const [email, setEmail] = useState(props.message.email);
    const [message, setMessage] = useState(props.message.message);
    const [reply, setReply] = useState('');

    const sendMessage = () => {
        let data = {
            name: name,
            subject: subject,
            email: email,
            message: message,
            reply: reply
        }
        console.log(data);
        fetch(API_ENDPOINT + '/messages/sendMessage.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
        });


    }

  return (
    <div>
        <div className="message-parent">
            <div className="message-body">
                <div className="message-body-inputs">
                    <div className="message-input">
                        <label>Name</label>
                        <input type="text" className='input' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="message-input">
                        <label>Subject</label>
                        <input type="text" className='input' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className="message-input">
                        <label>Email</label>
                        <input type="text" className='input' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="message-input">
                        <div>Message</div>
                        <textarea className='w-100' onChange={(e) => setMessage(e.target.value)}>{message}</textarea>
                    </div>
                    <div className="message-input w-100">
                        <div>Reply</div>
                        <textarea className='w-100' onChange={(e) => setReply(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="submit-btn" onClick={() => sendMessage()}>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
