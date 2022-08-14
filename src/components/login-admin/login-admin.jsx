
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useEffect, useState, useRef } from 'react'
import './login-admin.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../endpoints/api.dev';
import Modal from '../modal/Modal';
import SendMessage from '../send-message/SendMessage';
import pic from '../../assets/images/add_pp.png'

function LoginAdmin() {
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [checkedBoxes, setCheckBox] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState({
        name: '',
        subject: '',
        phone: '',
        email: '',
        message: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [ancestor, setSellTo] = useState([]);
    const [owner, setOwner] = useState();
    const [size, setSize] = useState(0);

    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    const toggleCheckBox = (e, key) => {
        const updatedCheckedState = checkedBoxes.map((item, index) => {
            return index === key ? !item : item
        });

        setCheckBox(updatedCheckedState);
    };

    useEffect(() => {
        fetch(API_ENDPOINT + 'users/getUsersWithoutID.php', {
            method: "POST",
            body: JSON.stringify({
                ID: 0
            })
        })
            .then(res => res.json())
            .then(res => {
                setSellTo(res);
            }).catch(err => {
                alert("Message not sent");
            }
            );

        let url = API_ENDPOINT + '/contact/getContacts.php';
        axios.get(url)
            .then(res => {
                let filteredData = res.data.filter(item => item.IsVerified === 0);
                setData(filteredData);
                setCheckBox(new Array(filteredData.length).fill(false));
            }).catch(err => {
                console.log(err);
            });



        axios.get(API_ENDPOINT + '/messages/getMessages.php')
            .then(res => {
                console.log('messages data is', res.data);
                setMessages(res.data);
            }).catch(err => {
                console.log(err);
            });
    }, []);


    const verifySelectedUsers = () => {
        const selectedUsers = data.filter((item, index) => {
            return checkedBoxes[index]
        });
        selectedUsers.forEach(item => {
            let data = {
                name: item.name,
                id: item.id,
                isVerified: true
            }
            axios.post(API_ENDPOINT + '/contact/updateVerification.php', item)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                }
                );
        });
    }

    const selectCheckBox = (key) => {
        const updatedCheckedState = checkedBoxes.map((item, index) => {
            return index === key ? !item : item
        });

        setCheckBox(updatedCheckedState);
    }

    const openModal = (val) => {
        setCurrMessage(val);
        setShowModal(true);
    }

    const registerLand = () => {
        fetch(API_ENDPOINT + 'lands/registerLand.php', {
            method: "POST",
            body: JSON.stringify({
                ID: owner,
                size: size
            })
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
            }).catch(err => {
                alert("Message not sent");
            }
            );
    };

    return (
        <div>
            <Header />
            <div id='login-admin'>
                {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        <SendMessage message={currMessage} />
                    </Modal>
                }
                <div className='profile'>
                    <div>
                        <input type="file" accept='image/*' ref={imageUploader} style={{ display: "none" }} />
                        <div onClick={() => imageUploader.current.click()} style={{ height: "200px", width: "200px", border: "1px dashed black" }}>
                            <img class="profile-pic"
                                // ref={uploadedImage}
                                src={pic}
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    position: "absolute"
                                }}
                            />
                        </div>
                        <br />
                        <br />

                        <div class="admin-name"><label>Website Admin</label></div>

                    </div>

                    <div class="table-content">
                        <div style={{ display: 'block', border:'1px solid black', borderRadius: '10px', backgroundColor: '#ede8fc' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}><h1>Register Land</h1></div>
                            <br/>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <select name="ancestor" id="ancestor" className="ancestor_dd" required onChange={(e) => setOwner(e.target.value)} >
                                    <option value={-1}>Select Owner</option>
                                    {ancestor && ancestor.map((val) => {
                                        return (
                                            <option value={val['ID']}>{val['FirstName']} {val['LastName']}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <input type="number" placeholder='Size' className="ancestor_dd" onChange={(e) => setSize(e.target.value)} />
                            </div>
                            <br/>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button style={{ backgroundColor: 'black', color: 'white', padding: '1em 2em', borderRadius: '5px', fontSize: '16px' }} onClick={registerLand}>Register</button>
                            </div>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        {/* <table style={{ backgroundColor: '#675896', color: 'white' }}>
                                <tr>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Parent Name</th>
                                    <th>Verify</th>
                                </tr>
                                {data.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td><NavLink activeClassName="active" to="/project">{val.UserName}</NavLink></td>
                                            <td>{val.LastName}</td>
                                            <td>{val.ParentName}</td>
                                            <td><input type="checkbox" checked={checkedBoxes[key]} value={key} onClick={() => selectCheckBox(key)} /></td>
                                        </tr>
                                    )
                                })}
                            </table> */}
                        {/* </div> */}
                        {/* <div className='to_verify'>
                            <button className='verify_button' onClick={() => verifySelectedUsers()}>Verify</button>
                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}><h1>Messages</h1></div>
                        <br/>
                        <div className='dashboard_table_columns' style={{ display: 'block' }}>
                            <table style={{ backgroundColor: '#675896', color: 'white' }}>
                                <tr>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Email</th>
                                </tr>
                                {console.log("messages", messages)}
                                {messages.length > 0 && messages.map((val, key) => {
                                    return (
                                        <tr key={key} onClick={() => openModal(val)}>
                                            <td><NavLink activeClassName="active" to="/project">{val.name}</NavLink></td>
                                            <td>{val.subject}</td>
                                            <td>{val.phone}</td>
                                            <td>{val.message}</td>
                                            <td>{val.email}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        {/* <div className='to_verify'>
                            <NavLink activeClassName="active" to="/project">Respond</NavLink>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginAdmin;